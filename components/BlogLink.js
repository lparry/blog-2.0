import React, { PropTypes } from "react"
import Link from "../components/Link"

const BlogLink = (props) => (
  <p>
    <a onClick={Link.handleClick} href={props.path}>{props.children}</a>
  </p>
)
BlogLink.propTypes = {
  path: PropTypes.string.isRequired,
}

export default BlogLink
