import React from "react"
import PropTypes from "prop-types"
import copy from 'copy-to-clipboard';
import Modal from "./modal"

class GoogleButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showGoogle: false
    }

    this.onGoogleModalClose = this.onGoogleModalClose.bind(this)
    this.addClicked = this.addClicked.bind(this)
    this.copyTextClicked = this.copyTextClicked.bind(this)
  }
  onGoogleModalClose(e) {
    this.state.showGoogle = false
    this.setState({...this.state})
  }
  addClicked(e) {
    // this.props.calendarUrl
    debugger
    this.state.showGoogle = true
    this.setState({...this.state})

    // copy("text")
    //open modal
    //click to add url to clipboard
    //button to add calendar by url page
    //instructions to paste the link
    //https://calendar.google.com/calendar/r/settings/addbyurl
  }
  copyTextClicked() {
    copy(`https:${this.props.calendarUrl}`)
    //change icon state to show it was copied.
  }
  render() {
    return [
      (<a href="javascript:void(0)" className="btn btn-primary btn-lg" onClick={this.addClicked}>Open Google Calendar</a>)
      ,(<Modal
          show={this.state.showGoogle}
          title="Add to Google Calendar"
          onClose={this.onGoogleModalClose}
          showClose={true}
          showPrimary={false}
          closeText="OK"
          closeStyle="btn-primary">
          <h3>Instructions</h3>
          <p>
            Step 1, copy url to clipboard. <button type="button" onClick={this.copyTextClicked} className="btn btn-sm btn-secondary">Copy icon...</button>
            Step 2, paste in the Add Calendar by URL on Google.
            On Google's website, you can <a href="https://calendar.google.com/calendar/r/settings/addbyurl">add a calendar by URL</a>.
          </p>
        </Modal>)
    ]
  }
}

GoogleButton.propTypes = {
  calendarUrl: PropTypes.string.isRequired
}

export default GoogleButton
