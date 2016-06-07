import React, { PropTypes } from "react"
import "./styles.scss"

const BlogPost = (props) => {
  const { body, metadata: { title, formattedDate, tags } } = props
  return (
    <div className="blogPost__content">
      <h1>{title}</h1>
      <div className="date">{formattedDate}</div>
      <div className="blogPost__body">
        {body}
      </div>
      <div className="blogPost__tags">
        <div>Tags</div>
        {tags.map((tag, index) => <div className="blogPost__tag" key={index}>{tag}</div>)}
      </div>
    </div>
  )
}
BlogPost.propTypes = {
  body: PropTypes.node,
  metadata: PropTypes.shape({
    title: PropTypes.string,
    formattedDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
}

export default BlogPost
