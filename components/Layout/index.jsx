import React, { PropTypes } from "react"
import "./styles.scss"
import Navigation from "../Navigation"
import Sidebar from "../Sidebar"

function Layout({ children }) {
  return (
    <div className="root">
      <Navigation />
      <div className="content">
        <div className="layout">
          {children}
        </div>
        <Sidebar />
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Layout
