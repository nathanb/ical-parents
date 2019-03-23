import React from "react"
import PropTypes from "prop-types"

const AppleButton = ({calendarUrl}) => (
  <a href={`webcal:${calendarUrl}`} className="btn btn-block btn-lg btn-secondary"><i className="fab fa-apple"></i>&nbsp;Apple Calendar</a>
)

AppleButton.propTypes = {
  calendarUrl: PropTypes.string.isRequired
}

export default AppleButton
