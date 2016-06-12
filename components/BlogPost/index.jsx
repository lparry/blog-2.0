import React, { PropTypes } from "react"
import TagCloud from "../TagCloud"
import DateTime from "../DateTime"
import DisqusComments from "../DisqusComments"
import "./styles.scss"

const BlogPost = (props) => {
  const { body, metadata: { title, formattedDate, tags, canonicalPath } } = props
  return (
    <div className="blogPost__content">
      <h1 className="blogPost__title">{title}</h1>
      <DateTime date={formattedDate} />
      <div className="blogPost__body">
        {body}
      </div>
      <TagCloud className="blogPost__tags" tags={tags} />
      <DisqusComments disqusUrl={`http://www.lucasthenomad.com${canonicalPath}`} />
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
