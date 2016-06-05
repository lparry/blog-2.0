/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from "react"
import "./styles.scss"
import Link from "../Link"

const NavLink = ({ href, children }) => (
  <span className="navigation navigationHeader">
    <a className="navigationLink" href={href} >{children}</a>
  </span>
)
NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
}

function Navigation() {
  return (
    <nav className="navbar" role="navigation">
      <div className="navContainer">
        <span className="navigation">
          <a className="navigationLink" href="/" onClick={Link.handleClick}><i className="fa fa-globe fa-lg fa-fw" />Lucas The Nomad</a>
        </span>
        <NavLink href="https://www.facebook.com/lucasparry"><i className="fa fa-facebook fa-lg fa-fw" />Facebook</NavLink>
        <NavLink href="https://www.twitter.com/lucas_parry"><i className="fa fa-twitter fa-lg fa-fw" />Twitter</NavLink>
        <NavLink href="https://www.flickr.com/photos/lucasthenomad/"><i className="fa fa-flickr fa-lg fa-fw" />Flickr</NavLink>
        <NavLink href="https://instagram.com/lparry"><i className="fa fa-instagram fa-lg fa-fw" />Instagram</NavLink>
        <NavLink href="https://www.couchsurfing.org/people/lucasthenomad/"><i className="fa fa-suitcase fa-lg fa-fw" />Couchsurfing</NavLink>
        <NavLink href="/map"><i className="fa fa-map-marker fa-lg fa-fw" />Travel Map</NavLink>
      </div>
    </nav>
  )
}

export default Navigation
