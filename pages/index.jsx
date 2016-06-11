import React from "react"
import BlogPostSummary from "../components/BlogPostSummary"
import Link from "../components/Link"
import NextLink from "../components/NextLink"

const pageData = {}

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
    <NextLink to={pageData.nextPage} />
  </div>
)
