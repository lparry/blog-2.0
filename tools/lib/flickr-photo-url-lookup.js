import Flickr from "flickrapi"
import Promise from "bluebird"
import fs from "fs"
import childProcess from "child_process"
import path from "path"

Promise.promisifyAll(fs)

const flickrOptions = {
  api_key: process.env.FLICKR_API_KEY,
  secret: process.env.FLICKR_SHARED_SECRET,
  user_id: process.env.FLICKR_USER_ID,
  access_token: process.env.FLICKR_ACCESS_TOKEN,
  access_token_secret: process.env.FLICKR_ACCESS_TOKEN_SECRET,
}

function flickrDataFromDisk(id) {
  return fs.readFileAsync(path.resolve(__dirname, `../../flickr-data/${id}.json`))
    .then(data => JSON.parse(data))
    .catch(err => console.error(err))
}

function objectifySizeArray(sizeArray) {
  return sizeArray.reduce((memo, val) => {
    memo[val.label] = val // eslint-disable-line no-param-reassign
    return memo
  }, {})
}

function lookupPhoto(id) {
  const filename = `flickr-data/${id}.json`
  if (fs.existsSync(filename)) return flickrDataFromDisk(id)

  return Promise.promisify(Flickr.tokenOnly)(flickrOptions)
    .then(flickr => (
      Promise.promisify(flickr.photos.getSizes)({ photo_id: id })
        .then(result => result.sizes.size)
        .then(objectifySizeArray)
        .then(sizes => {
          fs.writeFileAsync(filename, JSON.stringify(sizes, null, 2)).catch(err => console.error(err))
          return sizes
        })
        .catch(err => console.error(err))
    )
  )
  .catch(error => console.error("shit", error))
}

export const cachePath = (id) => path.resolve(`cache/flickr/${id.slice(0, 2)}/${id}.jpg`)
export const cacheUrl = (id) => `/cache/flickr/${id.slice(0, 2)}/${id}.jpg`

const largestSize = sizes => (
  sizes.Original ||
  sizes["Large 2048"] ||
  sizes["Large 1600"] ||
  sizes.Large ||
  sizes["Medium 800"] ||
  sizes["Medium 640"] ||
  sizes.Medium
)

async function download(url, output) {
  console.log(`downloading ${output}...`)
  childProcess.execSync(`curl --silent --create-dirs --compressed --output ${output} ${url}`)
  console.log(`downloaded ${output}`)
}

function cacheImg(id) {
  const outputPath = cachePath(id)
  if (fs.existsSync(outputPath)) return Promise.resolve()

  return flickrDataFromDisk(id)
    .then(largestSize)
    .then(size => size.source)
    .then(url => download(url, outputPath))
}

export default function getImageData(id) {
  return lookupPhoto(id)
    .then(data => {
      cacheImg(id)
      return data
    })
   .then(largestSize)
   .then(size => ({
     height: size.height,
     width: size.width,
     source: cacheUrl(id),
   }))
}
