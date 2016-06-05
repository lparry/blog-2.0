/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React from "react"
import "./Navigation.scss"
import Link from "../Link"

const NavLink = ({ href, children }) => {
  return (
  <li className="Navigation-item">
    <a className="Navigation-link" href={href} onClick={Link.handleClick}>{children}</a>
  </li>
  )
}

function Navigation() {
  return (
    <div>
      <h1 className="header">Lucas The Nomad</h1>
      <ul className="Navigation" role="menu">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
      </ul>
    </div>
  )
}

export default Navigation
