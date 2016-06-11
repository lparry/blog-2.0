import React from "react"
import BlogPostSummary from "../../components/BlogPostSummary"
import Link from "../../components/Link"

const pageData = {}

export default () => (
  <div>
    {
      pageData.blogPosts && pageData.blogPosts.map(({ file, formattedDate, path, title }, index) => (
        <BlogPostSummary
          key={index}
          path={path}
          title={title}
          formattedDate={formattedDate}
          content={require(`../blog/${file}`).intro}
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
