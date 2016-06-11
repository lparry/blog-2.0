import React, { PropTypes } from "react"
import "./styles.scss"

const DateTime = ({ date }) => (
  <div className="date">
    <i className="fa fa-clock-o fa-lg fa-fw" /> {date}
  </div>
)
DateTime.propTypes = {
  date: PropTypes.string.isRequired,
}

export default DateTime
