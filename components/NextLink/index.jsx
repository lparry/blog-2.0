import React, { PropTypes } from "react"
import Link from "../Link"
import { ArrowRight } from "../Icons"
import "./styles.scss"

const NextLink = ({ to }) => {
  if (!to) return null
  return (
    <div className="nextLink">
      <Link to={to}>
        Older Stories <ArrowRight style={{ marginLeft: "5px" }} />
      </Link>
    </div>
  )
}
NextLink.propTypes = {
  to: PropTypes.string,
}

export default NextLink
