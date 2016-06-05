import React, { PropTypes } from "react"
import Link from "../Link"
import "./BlogLink.scss"

const BlogLink = (props) => (
  <h5 className="blogLinkHeading"><a onClick={Link.handleClick} href={props.path}>{props.children}</a></h5>
)
BlogLink.propTypes = {
  path: PropTypes.string.isRequired,
}

export default BlogLink
