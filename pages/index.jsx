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
  console.log(pageData)
  return (
    <div>
      {
        pageData.blogPosts && pageData.blogPosts.map(({ file, intro, formattedDate, path, title }, index) => {
          console.log(intro)
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
      <div className="moreLink"><a href={pageData.nextPage} onClick={Link.handleClick}>More Stories...</a></div>
    </div>
  )
}
