import React from "react"
import BlogPostSummary from "../../components/BlogPostSummary"

const blogPosts = []
const tag = ""

export default () => (
  <div>
    <h1>Posts tagged '{tag}'</h1>
    {
      blogPosts.map(({ file, formattedDate, path, title }, index) => (
        <BlogPostSummary
          key={index}
          path={path}
          title={title}
          formattedDate={formattedDate}
          content={require(`../blog/${file}`).intro}
        />
      )
      )
    }
  </div>
)
