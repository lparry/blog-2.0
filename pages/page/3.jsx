/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React from "react"
import BlogLink from "../../components/BlogLink"
import Link from "../../components/Link"

const pageData = {}

export default () => (
  <div>
    <h1>LucasTheNomad.com</h1>
    {pageData.previousPage && <a href={pageData.previousPage} onClick={Link.handleClick}>Back</a>}
    {
      pageData.blogPosts && pageData.blogPosts.map(({ file, path, title }, index) => (
        <div key={index}>
          <BlogLink path={path}>{title}</BlogLink>
          {require(`../blog/${file}`).intro}
        </div>
      ))
    }
    {pageData.nextPage && <a href={pageData.nextPage} onClick={Link.handleClick}>More...</a>}
  </div>
  )
