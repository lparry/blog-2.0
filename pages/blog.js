/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from "react"
import Link from "../components/Link"

const BlogLink = (props) => {
  return (
    <p>
      <a onClick={Link.handleClick} href={props.path}>{props.children}</a>
    </p>
  )
}

export default class extends Component {
  blogPages = []

  render() {
    return (
      <div>
        <h1>Blog</h1>
        <p>Coming soon.</p>
         {
           this.blogPages.map(({ path, title }, index) => (
             <BlogLink key={index} path={path}>{title}</BlogLink>
           ))
         }
      </div>
    )
  }
}
