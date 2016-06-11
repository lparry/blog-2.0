import React, { PropTypes } from "react"
import Link from "../Link"
import "./styles.scss"

const NextLink = ({ to }) => {
  if (!to) return null
  return (
    <div className="nextLink">
      <Link to={to}>
        Older Stories <i style={{ marginLeft: "5px" }} className="fa fa-arrow-right fa-lg" />
      </Link>
    </div>
  )
}
NextLink.propTypes = {
  to: PropTypes.string,
}

export default NextLink
