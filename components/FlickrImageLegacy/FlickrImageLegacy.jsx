import React, { PropTypes } from "react"
import flickrManifest from "../../flickr_manifest.json"
import Link from "../Link"
import "./FlickrImageLegacy.scss"

const FlickrImageLegacy = ({ linkUrl, flickrID, caption }) => {
  if (!flickrID) return <p>broken image</p>
  const baseImg = `${flickrID.slice(0, 2)}/${flickrID}`
  const jpgTinyKey = `${baseImg}-tiny.jpg`
  const jpgTinyRetinaKey = `${baseImg}-tiny@2x.jpg`
  const jpgKey = `${baseImg}.jpg`
  const jpgSmallKey = `${baseImg}-small.jpg`
  const jpgRetinaKey = `${baseImg}@2x.jpg`
  const jpgTinyUrl = `/assets/flickr/${flickrManifest[jpgTinyKey]}`
  const jpgTinyRetinaUrl = `/assets/flickr/${flickrManifest[jpgTinyRetinaKey]}`
  const jpgUrl = `/assets/flickr/${flickrManifest[jpgKey]}`
  const jpgSmallUrl = `/assets/flickr/${flickrManifest[jpgSmallKey]}`
  const jpgRetinaUrl = `/assets/flickr/${flickrManifest[jpgRetinaKey]}`

  return (
    <div className="flickrImage">
      <div className="flickrImage__container">
        <Link to={linkUrl}>
          <img
            src={jpgTinyUrl}
            srcSet={`
              ${jpgTinyUrl} 350w,
              ${jpgSmallUrl} 512w,
              ${jpgTinyRetinaUrl} 700w,
              ${jpgUrl} 1024w,
              ${jpgRetinaUrl} 2048w,
              `}
            sizes="(max-width: 1024px) 80vw, 80vw" // , calc(100vw - 50px)"
            // width="1024px"
            // height={`${parseInt(height * scaleRatio, 10)}px`}
            alt={caption}
          />
          <p className="flickrImageCaption">{caption}</p>
        </Link>
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
