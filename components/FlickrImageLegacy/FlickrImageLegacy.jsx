import React, { PropTypes } from "react"
import flickrManifest from "../../flickr_manifest.json"
import "./FlickrImageLegacy.scss"

const FlickrImageLegacy = ({ linkUrl, flickrID, caption }) => {
  if (!flickrID) return <p>broken image</p>
  const baseImg = `${flickrID.slice(0, 2)}/${flickrID}`
  // const jpg = `${baseImg}.jpg`
  // const jpgR = `${baseImg}@2x.jpg`
  const webpTinyKey = `${baseImg}-tiny.webp`
  const webpTinyRetinaKey = `${baseImg}-tiny@2x.webp`
  const webpKey = `${baseImg}.webp`
  const webpSmallKey = `${baseImg}-small.webp`
  const webpRetinaKey = `${baseImg}@2x.webp`
  const webpTinyUrl = `/assets/flickr/${flickrManifest[webpTinyKey]}`
  const webpTinyRetinaUrl = `/assets/flickr/${flickrManifest[webpTinyRetinaKey]}`
  const webpUrl = `/assets/flickr/${flickrManifest[webpKey]}`
  const webpSmallUrl = `/assets/flickr/${flickrManifest[webpSmallKey]}`
  const webpRetinaUrl = `/assets/flickr/${flickrManifest[webpRetinaKey]}`

  return (
    <div className="flickrImage">
      <div className="flickrImage__container">
        <a href={linkUrl}>
          <img
            src={webpTinyUrl}
            type="image/webp"
            srcSet={`
              ${webpTinyUrl} 350w,
              ${webpSmallUrl} 512w,
              ${webpTinyRetinaUrl} 700w,
              ${webpUrl} 1024w,
              ${webpRetinaUrl} 2048w,
              `}
            sizes="(max-width: 1024px) 80vw, 80vw" // , calc(100vw - 50px)"
            // width="1024px"
            // height={`${parseInt(height * scaleRatio, 10)}px`}
            alt={caption}
          />
          <p className="flickrImageCaption">{caption}</p>
        </a>
      </div>
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
