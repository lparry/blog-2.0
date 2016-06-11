import React, { PropTypes } from "react"
import "./styles.scss"
import Navigation from "../Navigation"
import Sidebar from "../Sidebar"

function Layout({ children }) {
  return (
    <div>
      <Navigation />
      <div className="content">
        <div className="Layout">
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
