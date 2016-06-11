import React, { PropTypes } from "react"
import "./styles.scss"
import Link from "../../components/Link"
import BlogLink from "../BlogLink"

const BlogPostSummary = ({ path, title, formattedDate, content }) => (
  <div className="blogPostSummary">
    <BlogLink path={path}>{title}</BlogLink>
    <div className="date">{formattedDate}</div>
    {content}
    <div className="moreLink"><Link to={path}>Read More...</Link></div>
    <hr className="divider" />
  </div>
)

BlogPostSummary.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  formattedDate: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
}

export default BlogPostSummary
