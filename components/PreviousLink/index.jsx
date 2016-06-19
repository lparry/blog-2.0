import React, { PropTypes } from "react"
import Link from "../Link"
import { ArrowLeft } from "../Icons"
import "./styles.scss"

const PreviousLink = ({ to }) => {
  if (!to) return null
  return (
    <div className="previousLink">
      <Link to={to}>
        <ArrowLeft style={{ marginRight: "5px" }} /> Newer Stories
      </Link>
    </div>
  )
}
PreviousLink.propTypes = {
  to: PropTypes.string,
}

export default PreviousLink
