import React from "react"
import BlogPostSummary from "../components/BlogPostSummary"
import Link from "../components/Link"
import TagCloud from "../components/TagCloud"

const pageData = {}
const tags = []

export default () => (
  <div>
    {
      pageData.blogPosts && pageData.blogPosts.map((props, index) => (
        <BlogPostSummary
          key={index}
          {...props}
          content={require(`./blog/${props.file}`).intro}
        />
      ))
    }
    <div className="moreLink"><Link to={pageData.nextPage}>Older Stories...</Link></div>
    <TagCloud tags={tags} />
  </div>
)
