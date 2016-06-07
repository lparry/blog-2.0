import React, { PropTypes } from "react"
import Link from "../Link"
import "./styles.scss"

const BlogLink = (props) => (
  <h5 className="blogLinkHeading"><Link to={props.path}>{props.children}</Link></h5>
)
BlogLink.propTypes = {
  children: PropTypes.node,
  path: PropTypes.string.isRequired,
}

export default BlogLink
