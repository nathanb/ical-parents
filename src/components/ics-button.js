import React from "react"
import PropTypes from "prop-types"

const AndroidButton = ({calendarUrl}) => (
  <a href={`https:${calendarUrl}`} className="btn btn-block btn-lg btn-dark">Calendar ICS<br/>(Outlook, iCalendar, etc)</a>
)

AndroidButton.propTypes = {
  calendarUrl: PropTypes.string.isRequired
}

export default AndroidButton
