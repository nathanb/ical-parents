import React from "react"
import PropTypes from "prop-types"

const AppleButton = ({calendarUrl}) => (
  <a href={`webcal:${calendarUrl}`} className="btn btn-primary btn-lg">Add to Apple Calendar</a>
)

AppleButton.propTypes = {
  calendarUrl: PropTypes.string.isRequired
}

export default AppleButton
