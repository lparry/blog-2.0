import React from "react"
import "./styles.scss"
import Link from "../Link"
import { Facebook, Suitcase, Globe, Instagram, Flickr, MapMarker, Twitter } from "../Icons"

function Navigation() {
  return (
    <nav className="navbar">
      <Link className="navbar__link" to="/">
        <Globe className="navbar__icon" /> Lucas The Nomad
      </Link>
      <Link className="navbar__link--hideable" to="https://www.facebook.com/lucasparry">
        <Facebook className="navbar__icon" /> Facebook
      </Link>
      <Link className="navbar__link--hideable" to="https://www.twitter.com/lucas_parry">
        <Twitter className="navbar__icon" /> Twitter
      </Link>
      <Link className="navbar__link--hideable" to="https://www.flickr.com/photos/lucasthenomad/">
        <Flickr className="navbar__icon" /> Flickr
      </Link>
      <Link className="navbar__link--hideable" to="https://instagram.com/lparry">
        <Instagram className="navbar__icon" /> Instagram
      </Link>
      <Link className="navbar__link--hideable" to="https://www.couchsurfing.org/people/lucasthenomad/">
        <Suitcase className="navbar__icon" /> Couchsurfing
      </Link>
      <Link className="navbar__link--hideable" to="/map">
        <MapMarker className="navbar__icon" /> Map
      </Link>
    </nav>
  )
}

export default Navigation
