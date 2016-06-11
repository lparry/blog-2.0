import React from "react"
import BlogPostSummary from "../components/BlogPostSummary"
import Link from "../components/Link"
import TagCloud from "../components/TagCloud"

const pageData = {}
const tags = []

export default () => {
  return (
    <div>
      {
        pageData.blogPosts && pageData.blogPosts.map(({ file, formattedDate, path, title }, index) => {
          return (
            <BlogPostSummary
              key={index}
              path={path}
              title={title}
              formattedDate={formattedDate}
              content={require(`./blog/${file}`).intro}
            />
          )
        })
      }
      <div className="moreLink"><Link to={pageData.nextPage}>Older Stories...</Link></div>
      <TagCloud tags={tags} />
    </div>
  )
}
