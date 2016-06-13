import Promise from "bluebird"
import parseUtils from "parse5-utils"
import fs from "fs"
import moment from "moment"
import formatTag from "../../lib/formatTag"

const fsP = Promise.promisify(fs.readFile)

function closeImgTags(source) {
  return source.replace(/(<img [^>]*)/g, (_match, p1) => {
    if (p1[p1.length - 1] === "/") return p1
    return `${p1} /`
  })
}

function lineIsOtherImage(line) {
  return line.match(/p class="flickr-image-container"/)
}

function lineIsFlickrImage(line) {
  return line.match(/<a [^>]*><img [^>]*src="https?:\/\/[a-z0-9]*.staticflickr.com[^>]*>/)
}

function extractPhotoSrc(line) {
  const src = (line.match(/src="([^"]+)"/) || [])[1]
  if (src.match(/^http/)) {
    const path = src.replace(/https?:\/\/[^\/]+\//, "/")
    return path
  }
  return src
}

function extractPhotoCaption(line) {
  return (line.match(/<em>(.+)<\/em>/) || [])[1] ||
         (line.match(/alt="([^"]+)"/) || [])[1] ||
           ""
}

function extractFlickrImageId(line) {
  return parseInt(
    (
      line.match(/src="https?:\/\/farm[0-9]+.staticflickr.com\/[0-9]+\/([0-9]+)_[^>]*>/) ||
      line.match(/src="https?:\/\/c[0-9]+.staticflickr.com\/[0-9]\/[0-9]+\/([0-9]+)_[^>]*>/)
    )[1],
    10)
}

function extractFlickrImageDetails(line) {
  const doc = parseUtils.parseFragment(line)

  return {
    imagePageUrl: parseUtils.attributesOf(doc.childNodes[0]).href,
    altTag: parseUtils.attributesOf(doc.childNodes[0].childNodes[0]).alt,
  }
}

function replaceMarkdownLinks(line) {
  return line.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (_, text, url) => `<a href="${url}">${text}</a>`)
}

function escapeQuotes(str) {
  return str.replace(/"/g, "&quot;")
}

function lineHasDiv(line) {
  return !!(line.match(/<div/))
}

function lineIsImage(line) {
  return lineIsFlickrImage(line) || lineIsOtherImage(line)
}

function paragraphize(memo, line, index, lines) {
  if (lineIsFlickrImage(line)) {
    const flickrID = extractFlickrImageId(line)
    const flickrDetails = extractFlickrImageDetails(line)
    memo.push(`<FlickrImageLegacy flickrID="${flickrID}" linkUrl="${flickrDetails.imagePageUrl}" caption="${escapeQuotes(flickrDetails.altTag)}" />`)
  } else if (lineIsOtherImage(line)) {
    const photoSrc = extractPhotoSrc(line)
    if (!photoSrc) throw new Error(`src line ${line}`)
    const caption = escapeQuotes(extractPhotoCaption(line))
    memo.push(`<Photo src="${photoSrc}" caption="${caption}" />`)
  } else {
    if (index === 0 && !lineIsImage(lines[0]) && !lineHasDiv(lines[0])) { memo.push("<p>") }
    if (line === "" && !lineIsImage(lines[index - 1]) && !lineHasDiv(lines[index - 1])) { memo.push("</p>") }
    memo.push(line)
    if (line === "" && !lineIsImage(lines[index + 1]) && !lineHasDiv(lines[index + 1])) { memo.push("<p>") }
    if (index === (lines.length - 1) && !lineIsImage(lines[index]) && !lineHasDiv(lines[index])) { memo.push("</p>") }
  }
  return memo
}

function fixPropNames(line) {
  return line
    .replace(/ class=/g, " className=")
    .replace(/ frameborder=/, " frameBorder=")
    .replace(/allowfullscreen/, "allowFullScreen")
    .replace(/videowrapper/, "videoWrapper")
}

function spaceFlickrImages(memo, line, index, array) {
  if (lineIsFlickrImage(line)) {
    if ((array[index - 1] || "").trim() !== "") memo.push("")
    memo.push(line)
    if ((array[index + 1] || "").trim() !== "") memo.push("")
  } else {
    memo.push(line)
  }
  return memo
}

function format(source) {
  return source
    .split("\n")
    .map(replaceMarkdownLinks)
    .reduce(spaceFlickrImages, [])
    .reduce(paragraphize, [])
    .map(fixPropNames)
    .join("\n")
}

const urlify = (title) => (
  title.replace(/[^a-zA-Z0-9]+/g, "-")
  .toLowerCase()
  .replace(/^-/, "")
  .replace(/-$/, "")
)

export function parseLegacyMarkdown(source) {
  const file = closeImgTags(source).split("\n")
  const endMeta = file.indexOf("---", 1)
  const endIntro = file.indexOf("<!-- more -->")

  const meta = file.
    slice(1, endMeta).
    join("\n").
    trim().
    split("\n")

  const nicerMeta = meta.reduce((memo, line) => {
    const splitPoint = line.indexOf(":")
    const key = line.slice(0, splitPoint).trim()
    let value = line.slice(splitPoint + 1).trim()
    if (key === "title") { value = value.replace(/^"/, "").replace(/"$/, "") }
    if (key === "layout" ||
        key === "priority" ||
        key === "author" ||
        key === "categories" ||
        key === "description") { return memo }
    if (key === "old_blog_url") {
      memo.oldBlogUrl = value.replace(/^http:..www.lucasthenomad.com/, "") // eslint-disable-line no-param-reassign
      return memo
    }
    memo[key] = value // eslint-disable-line no-param-reassign
    return memo
  }, {})
  nicerMeta.formattedDate = moment(nicerMeta.date).format("MMMM Do YYYY, h:mm:ss a")
  if (!nicerMeta.canonicalPath) {
    const date = nicerMeta.date.replace(/ \d+:\d+/, "").replace(/-/g, "/")
    const title = urlify(nicerMeta.title)
    nicerMeta.canonicalPath = `/${date}/${title}`
  }

  nicerMeta.tags = nicerMeta.tags
    .split(/[, ]/)
    .map(tag => formatTag(tag.replace(/-/g, " ").trim()))
    .filter(tag => tag.length > 0)

  const intro = file.
    slice(endMeta + 1, endIntro).
    join("\n").
    trim()

  const body = endIntro > 0 ? file.
    slice(endIntro + 1, file.length).
    join("\n").
    trim() : null

  const nicerIntro = format(intro)
  const nicerBody = body ? format(body) : ""

  const replaceLinks = (content, url) => content.replace(/linkUrl="[^"]*"/g, `linkUrl="${url}"`)

  return { intro: replaceLinks(nicerIntro, nicerMeta.canonicalPath), body: [nicerIntro, nicerBody].join("\n"), meta: nicerMeta }
}

const jsxify = (data) => (
  `import React from "react"
${data.body.match(/<FlickrImageLegacy/) ? 'import FlickrImageLegacy from "../../components/FlickrImageLegacy"' : ''}
${data.body.match(/<Photo/) ? 'import Photo from "../../components/Photo"' : ''}
import BlogPost from "../../components/BlogPost"

export const metadata = ${JSON.stringify(data.meta, null, 2)}

export const intro = <div className="postIntro">
${data.intro}
</div>

export const body = <div className="postBody">
${data.body}
</div>
const blogPages = []

export default () => <BlogPost metadata={metadata} body={body} />` // eslint-disable-line max-len
)

export default function markdownTranspiler(file) {
  return fsP(file, "utf8")
  .then(parseLegacyMarkdown)
  .then(jsxify)
  .catch(console.log)
}
