import React, { PropTypes } from "react"
import "./styles.scss"
import Link from "../Link"
import TagCloud from "../TagCloud"
import BlogLink from "../BlogLink"
import DateTime from "../DateTime"

const BlogPostSummary = ({ path, title, formattedDate, content, tags }) => (
  <section className="blogPostSummary">
    <BlogLink path={path}>{title}</BlogLink>
    <DateTime date={formattedDate} />
    {content}
    <TagCloud tags={tags} />
    <div className="moreLink"><Link to={path}>Read More...</Link></div>
    <hr className="divider" />
  </section>
)

BlogPostSummary.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  formattedDate: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
}

export default BlogPostSummary
