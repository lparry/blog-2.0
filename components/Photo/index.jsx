import React, { PropTypes } from "react"
import imageManifest from "../../image_manifest.json"
import Link from "../Link"
import "./styles.scss"

const Photo = ({ src, caption, linkUrl }) => {
  if (!src) return <p>broken image</p>
  const baseImg = `${src.replace(/^\//, "").replace(/\.jpg/, "")}`
  const jpgTinyKey = `${baseImg}-tiny.jpg`
  const jpgTinyRetinaKey = `${baseImg}-tiny@2x.jpg`
  const jpgKey = `${baseImg}.jpg`
  const jpgSmallKey = `${baseImg}-small.jpg`
  const jpgRetinaKey = `${baseImg}@2x.jpg`
  const jpgTinyUrl = `/assets/images/${imageManifest[jpgTinyKey]}`
  const jpgTinyRetinaUrl = `/assets/images/${imageManifest[jpgTinyRetinaKey]}`
  const jpgUrl = `/assets/images/${imageManifest[jpgKey]}`
  const jpgSmallUrl = `/assets/images/${imageManifest[jpgSmallKey]}`
  const jpgRetinaUrl = `/assets/images/${imageManifest[jpgRetinaKey]}`

  return (
    <div className="photo">
      <Link to={linkUrl}>
        <figure className="photo__figure">
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
            alt={caption}
          />
          <figcaption className="photo__caption">{caption}</figcaption>
        </figure>
      </Link>
    </div>
  )
}
Photo.propTypes = {
  src: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  caption: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
}
Photo.defaultProps = {
  linkUrl: "#",
}
export default Photo
