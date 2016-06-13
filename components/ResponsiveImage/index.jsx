import React, { PropTypes } from "react"
import "./styles.scss"

const ResponsiveImage = ({ baseKey, caption, prefix, manifest }) => {
  const pathTo = path => `/assets/${prefix}/${path}`
  const addSrcSetEntry = (array, image, wVal) => {
    if (!image) {
      console.error(`${prefix} not in manifest: ${src} ${wVal}`) // eslint-disable-line no-console
      return
    }
    array.push(`${pathTo(image)} ${wVal}`)
  }

  const jpgTiny = manifest[`${baseKey}-tiny.jpg`]
  const jpgTinyRetina = manifest[`${baseKey}-tiny@2x.jpg`]
  const jpg = manifest[`${baseKey}.jpg`]
  const jpgSmall = manifest[`${baseKey}-small.jpg`]
  const jpgRetina = manifest[`${baseKey}@2x.jpg`]

  const srcSet = []
  addSrcSetEntry(srcSet, jpgTiny, "350w")
  addSrcSetEntry(srcSet, jpgSmall, "512w")
  addSrcSetEntry(srcSet, jpgTinyRetina, "700w")
  addSrcSetEntry(srcSet, jpg, "1024w")
  addSrcSetEntry(srcSet, jpgRetina, "2048w")

  return (
    <figure className="responsiveImage">
      <img
        src={pathTo(jpgTiny)}
        srcSet={srcSet.join(",")}
        sizes="(max-width: 1024px) 80vw, 80vw"
        alt={caption}
      />
      <figcaption className="responsiveImage__caption">{caption}</figcaption>
    </figure>
  )
}
ResponsiveImage.propTypes = {
  baseKey: PropTypes.string.isRequired,
  caption: PropTypes.string,
  prefix: PropTypes.string,
  manifest: PropTypes.object,
}

export default ResponsiveImage
