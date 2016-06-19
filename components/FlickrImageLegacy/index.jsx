import React, { PropTypes } from "react"
import flickrManifest from "../../flickr_manifest.json"
import ResponsiveImage from "../ResponsiveImage"
import Link from "../Link"
import "./styles.scss"

const FlickrImageLegacy = ({ linkUrl, flickrID, caption }) => {
  if (!flickrID) return <p>broken image</p>
  const baseKey = `${flickrID.slice(0, 2)}/${flickrID}`

  return (
    <div className="flickrImage">
      <Link to={linkUrl}>
        <ResponsiveImage baseKey={baseKey} caption={caption} prefix="flickr" manifest={flickrManifest} />
      </Link>
    </div>
  )
}
FlickrImageLegacy.propTypes = {
  linkUrl: PropTypes.string.isRequired,
  flickrID: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
}
export default FlickrImageLegacy
