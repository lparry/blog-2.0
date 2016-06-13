import React, { PropTypes } from "react"
import imageManifest from "../../image_manifest.json"
import Link from "../Link"
import ResponsiveImage from "../ResponsiveImage"
import "./styles.scss"

const Photo = ({ src, caption, linkUrl }) => {
  if (!src) return <p>broken image</p>
  const baseKey = `${src.replace(/^\//, "").replace(/\.jpg/, "")}`

  return (
    <div className="photo">
      {
        linkUrl ?
          <Link to={linkUrl}>
            <ResponsiveImage baseKey={baseKey} caption={caption} prefix="images" manifest={imageManifest} />
          </Link>
        :
          <ResponsiveImage baseKey={baseKey} caption={caption} prefix="images" manifest={imageManifest} />
        }

    </div>
  )
}
Photo.propTypes = {
  src: PropTypes.string.isRequired,
  linkUrl: PropTypes.string,
  caption: PropTypes.string,
}
export default Photo
