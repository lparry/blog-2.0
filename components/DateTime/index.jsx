import React, { PropTypes } from "react"
import { Clock } from "../Icons"
import "./styles.scss"

const DateTime = ({ date }) => (
  <div className="date">
    <Clock width={13} />{date}
  </div>
)
DateTime.propTypes = {
  date: PropTypes.string.isRequired,
}

export default DateTime
