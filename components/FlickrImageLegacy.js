import React, { PropTypes } from "react"
import flickrManifest from "../flickr_manifest.json"

const FlickrImageLegacy = ({ linkUrl, flickrID, caption, height, width }) => {
  if (!flickrID) return <p>broken image</p>
  const scaleRatio = 1024 / width
  const baseImg = `${flickrID.slice(0, 2)}/${flickrID}`
  // const jpg = `${baseImg}.jpg`
  // const jpgR = `${baseImg}@2x.jpg`
  const webpKey = `${baseImg}.webp`
  const webpSmallKey = `${baseImg}-small.webp`
  const webpRetinaKey = `${baseImg}@2x.webp`
  const webpUrl = `/assets/flickr/${flickrManifest[webpKey]}`
  const webpSmallUrl = `/assets/flickr/${flickrManifest[webpSmallKey]}`
  const webpRetinaUrl = `/assets/flickr/${flickrManifest[webpRetinaKey]}`
  return (
    <div>
      <a href={linkUrl}>
        <img
          src={webpSmallUrl}
          type="image/webp"
          srcSet={`${webpRetinaUrl} 2x, ${webpUrl} 1x`}
          // sizes="(min-width: 36em) 33.3vw, 100vw"
          width="1024px"
          height={`${parseInt(height * scaleRatio, 10)}px`}
          alt={caption}
        />
      </a>
      <p>{caption}</p>
    </div>
  )
}
FlickrImageLegacy.propTypes = {
  linkUrl: PropTypes.string.isRequired,
  flickrID: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
}
export default FlickrImageLegacy
