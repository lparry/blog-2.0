/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from "react"
import "./styles.scss"
import Navigation from "../Navigation"

function Layout({ children }) {
  return (
    <div>
      <Navigation />
      <div className="Layout">
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Layout
