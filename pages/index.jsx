/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React from "react"
import BlogPostSummary from "../components/BlogPostSummary"
import Link from "../components/Link"

const pageData = {}

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
    </div>
  )
}
