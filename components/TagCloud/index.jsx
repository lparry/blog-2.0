import React, { PropTypes } from "react"
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

const TagCloud = ({ tags, index }) => (
  <div className="tagCloud">
    {tags.map((tag, index) => <Tag key={index} tagName={tag} />)}
  </div>
)
TagCloud.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
}

export default TagCloud
