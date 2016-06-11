import React from "react"
import BlogPostSummary from "../../components/BlogPostSummary"
import Link from "../../components/Link"

const pageData = {}

export default () => (
  <div>
    {
      pageData.blogPosts && pageData.blogPosts.map((props, index) => (
        <BlogPostSummary
          key={index}
          {...props}
          content={require(`../blog/${prop.file}`).intro}
        />
      ))
    }
    {pageData.previousPage &&
      <div className="previousLink"><Link to={pageData.previousPage}>{"< Newer Stories"}</Link></div>
    }
    {pageData.nextPage &&
      <div className="moreLink"><Link to={pageData.nextPage}>{"Older Stories >"}</Link></div>
    }
  </div>
)
