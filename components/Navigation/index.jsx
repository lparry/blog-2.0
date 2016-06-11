import React, { PropTypes } from "react"
import "./styles.scss"
import Link from "../Link"

const Icon = ({ type }) => <i className={`fa fa-${type} fa-lg fa-fw`} />
Icon.propTypes = { type: PropTypes.string.isRequired }

function Navigation() {
  return (
    <nav className="navbar" role="navigation">
      <Link className="navbar__link" to="/">
        <Icon type="globe" />Lucas The Nomad
      </Link>
      <Link className="navbar__link--hideable" to="https://www.facebook.com/lucasparry">
        <Icon type="facebook" />Facebook
      </Link>
      <Link className="navbar__link--hideable" to="https://www.twitter.com/lucas_parry">
        <Icon type="twitter" />Twitter
      </Link>
      <Link className="navbar__link--hideable" to="https://www.flickr.com/photos/lucasthenomad/">
        <Icon type="flickr" />Flickr
      </Link>
      <Link className="navbar__link--hideable" to="https://instagram.com/lparry">
        <Icon type="instagram" />Instagram
      </Link>
      <Link className="navbar__link--hideable" to="https://www.couchsurfing.org/people/lucasthenomad/">
        <Icon type="suitcase" />Couchsurfing
      </Link>
      <Link className="navbar__link--hideable" to="/map">
        <Icon type="map-marker" />Map
      </Link>
    </nav>
  )
}

export default Navigation
