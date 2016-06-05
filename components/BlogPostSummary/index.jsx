import React, { PropTypes } from "react"
import "./styles.scss"
import Link from "../../components/Link"
import BlogLink from "../BlogLink"

const BlogPostSummary = ({ path, title, content }) => (
  <div className="blogPostSummary">
    <BlogLink path={path}>{title}</BlogLink>
    {content}
    <div className="moreLink"><a href={path} onClick={Link.handleClick}>Read More...</a></div>
    <hr className="divider" />
  </div>
)
BlogPostSummary.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default BlogPostSummary
