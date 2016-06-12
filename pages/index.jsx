import React from "react"
import BlogPostSummary from "../components/BlogPostSummary"
import Link from "../components/Link"
import ClearFix from "../components/ClearFix"
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
    <ClearFix />
    <NextLink to={pageData.nextPage} />
  </div>
)
