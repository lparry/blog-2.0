import React, { PropTypes } from "react"
import Link from "../Link"
import "./styles.scss"

const PreviousLink = ({ to }) => {
  if (!to) return null
  return (
    <div className="previousLink">
      <Link to={to}>
        <i style={{ marginRight: "5px" }} className="fa fa-arrow-left fa-lg" /> Newer Stories
      </Link>
    </div>
  )
}
PreviousLink.propTypes = {
  to: PropTypes.string,
}

export default PreviousLink
