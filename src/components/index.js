import React from "react"
import PropTypes from "prop-types"
import GoogleButton from "./google-button"
import AppleButton from "./apple-button"

const IndexView = ({calendarUrl}) => (
  <p class="lead">
    <AppleButton url={this.props.calendarUrl}/>
    &nbsp;<GoogleButton url={this.props.calendarUrl}/>
  </p>
)

IndexView.propTypes = {
  calendarUrl: PropTypes.string.isRequired
}

export default IndexView
