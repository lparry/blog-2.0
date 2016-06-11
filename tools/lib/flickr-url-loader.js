import flickrPhotoUrlLookup from "./flickr-photo-url-lookup"
import replaceAsync from "string-replace-async"


module.exports = function flickrUrlLoader(source) {
  this.cacheable()
  const callback = this.async()

  replaceAsync(source, /(<FlickrImageLegacy .*)flickrID="([0-9]+)" ([^>]+>)/g, (_, start, id, end) => (
    flickrPhotoUrlLookup(id).then(data => (
      `${start} height={${parseInt(data.height / 2, 10)}} flickrID="${id}" width={${parseInt(data.width / 2, 10)}} src="${data.source}" ${end}`
    ))
  ))
  .then(result => callback(null, result))
}
