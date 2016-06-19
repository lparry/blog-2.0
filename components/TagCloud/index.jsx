import React, { PropTypes } from "react"
import { TagsIcon } from "../Icons"
import Link from "../Link"
import "./styles.scss"

function toTagUrl(tag) {
  return `/tags/${tag.toLowerCase().replace(/ /g, "-")}`
}

const Tag = ({ tagName }) => (
  <Link to={toTagUrl(tagName)}>
    <div className="tagCloud__tag">{tagName}</div>
  </Link>
)
Tag.propTypes = {
  tagName: PropTypes.string,
}

const TagCloud = ({ noTitle, className, tags }) => {
  if (tags.length === 0) return null
  return (
    <div className={`tagCloud ${className}`}>
      {noTitle ? null : <div className="tagCloud__title"><TagsIcon width={22} />Tags:</div>}
      {tags.map((tag, index) => <Tag key={index} tagName={tag} />)}
    </div>
  )
}
TagCloud.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  noTitle: PropTypes.bool,
}

TagCloud.defaultProps = {
  noTitle: false,
  className: "",
  tags: [],
}

export default TagCloud
