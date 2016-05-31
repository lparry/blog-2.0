/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from "react"
import Link from "../components/Link"

const BlogLink = (props) => (
  <p>
    <a onClick={Link.handleClick} href={props.path}>{props.children}</a>
  </p>
)
BlogLink.propTypes = {
  path: PropTypes.string.required,
  children: PropTypes.element.required,
}

const blogPages = []

export default () => (
  <div>
    <h1>LucasTheNomad.com</h1>
    {
      blogPages.map(({ path, title }, index) => (
        <BlogLink key={index} path={path}>{title}</BlogLink>
      ))
    }
  </div>
  )
