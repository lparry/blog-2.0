/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React from "react"
import "./styles.scss"
import Link from "../Link"

const NavLink = ({ href, children }) => {
  return (
    <span className="Navigation navigationHeader">
      <a className="Navigation-link" href={href} >{children}</a>
    </span>
  )
}

function Navigation() {
  return (
    <nav className="navbar" role="navigation">
      <div className="navContainer">
        <span className="Navigation">
          <a className="Navigation-link" href="/" onClick={Link.handleClick}>Lucas The Nomad</a>
        </span>
        <NavLink href="/about">Facebook</NavLink>
        <NavLink href="/about">Twitter</NavLink>
        <NavLink href="/about">Flickr</NavLink>
        <NavLink href="/about">Instagram</NavLink>
        <NavLink href="/about">Couchsurfing</NavLink>
        <NavLink href="/about">Travel Map</NavLink>
      </div>
    </nav>
  )
}

export default Navigation
