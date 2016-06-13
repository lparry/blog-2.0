import React from "react"
import BlogPostSummary from "../../components/BlogPostSummary"

const blogPosts = []
const tag = "Bags"

export default () => (
  <div>
    <h1>Posts tagged '{tag}'</h1>
    {
      blogPosts.map((props, index) => (
        <BlogPostSummary
          key={index}
          {...props}
          content={require(`../blog/${props.file}`).intro}
        />
      )
      )
    }
  </div>
)
