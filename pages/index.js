/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React from "react"
import BlogLink from "../components/BlogLink"

const blogPages = []

export default () => (
  <div>
    <h1>LucasTheNomad.com</h1>
    {
      blogPages.map(({ file, path, title }, index) => (
        <div>
          <BlogLink key={index} path={path}>{title}</BlogLink>
          {require(`./blog/${file}`).intro}
        </div>
      ))
    }
  </div>
  )
