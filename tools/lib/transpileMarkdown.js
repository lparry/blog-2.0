import Promise from "bluebird"
import parseUtils from "parse5-utils"
import fs from "fs"
import moment from "moment"

const fsP = Promise.promisify(fs.readFile)

function closeImgTags(source) {
  return source.replace(/(<img [^>]*)/g, (_match, p1) => {
    if (p1[p1.length - 1] === "/") return p1
    return `${p1} /`
  })
}

function lineIsFlickrImage(line) {
  return line.match(/<a [^>]*><img [^>]*src="https:\/\/farm[0-9]+.staticflickr.com[^>]*>/)
}

function extractFlickrImageId(line) {
  return parseInt(
    line.match(/src="https:\/\/farm[0-9]+.staticflickr.com\/[0-9]+\/([0-9]+)_[^>]*>/)[1],
    10)
}

function extractFlickrImageDetails(line) {
  const doc = parseUtils.parseFragment(line)

  return {
    imagePageUrl: parseUtils.attributesOf(doc.childNodes[0]).href,
    altTag: parseUtils.attributesOf(doc.childNodes[0].childNodes[0]).alt,
  }
}

function escapeQuotes(str) {
  return str.replace(/"/g, "&quot;")
}

function paragraphize(memo, line, index, array) {
  if (index === 0) { memo.push("<div>") }
  if (line === "") { memo.push("</div>") }
  if (lineIsFlickrImage(line)) {
    const flickrID = extractFlickrImageId(line)
    const flickrDetails = extractFlickrImageDetails(line)
    memo.push(`<FlickrImageLegacy flickrID="${flickrID}" linkUrl="${flickrDetails.imagePageUrl}" caption="${escapeQuotes(flickrDetails.altTag)}" />`)
  } else {
    memo.push(line)
  }
  if (line === "") { memo.push("<div>") }
  if (index === (array.length - 1)) { memo.push("</div>") }
  return memo
}

function fixPropNames(line) {
  return line
    .replace(/ class=/, " className=")
    .replace(/ frameborder=/, " frameBorder=")
    .replace(/allowfullscreen/, "allowFullScreen")
}

function format(source) {
  return source
    .split("\n")
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

  nicerMeta.tags = nicerMeta.tags.split(",").map(tag => tag.trim())

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
  `import React from "react"\nimport FlickrImageLegacy from "../../components/FlickrImageLegacy"\nimport BlogPost from "../../components/BlogPost"\nexport const metadata = ${JSON.stringify(data.meta, null, 2)}\nexport const intro = <div>${data.intro}</div>\nexport const body = <div>${data.body}</div>\nconst blogPages = [] \nexport default () => <BlogPost intro={intro} body={body} />` // eslint-disable-line max-len
)

export default function markdownTranspiler(file) {
  return fsP(file, "utf8")
  .then(parseLegacyMarkdown)
  .then(jsxify)
  .catch(console.log)
}
