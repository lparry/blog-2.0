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
      <Link to={linkUrl}>
        <ResponsiveImage baseKey={baseKey} caption={caption} prefix="images" manifest={imageManifest} />
      </Link>
    </div>
  )
}
Photo.propTypes = {
  src: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  caption: PropTypes.string,
}
Photo.defaultProps = {
  linkUrl: "#",
}
export default Photo
