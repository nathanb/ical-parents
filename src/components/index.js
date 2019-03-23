import React from "react"
import PropTypes from "prop-types"
import GoogleButton from "./google-button"
import AppleButton from "./apple-button"
import ICSButton from "./ics-button"

const IndexView = ({calendarUrl}) => (
  <div className="lead">
    <AppleButton calendarUrl={calendarUrl}/>
    <GoogleButton calendarUrl={calendarUrl}/>
    <ICSButton calendarUrl={calendarUrl}/>
  </div>
)

IndexView.propTypes = {
  calendarUrl: PropTypes.string.isRequired
}

export default IndexView
