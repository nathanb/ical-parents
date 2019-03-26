import React from "react"
import PropTypes from "prop-types"
import copy from 'copy-to-clipboard';
import Modal from "./modal"

class GoogleButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showGoogle: false
      ,copyButtonText: ""
      ,googleStep: 1
    }

    this.onGoogleModalClose = this.onGoogleModalClose.bind(this)
    this.addClicked = this.addClicked.bind(this)
    this.copyTextClicked = this.copyTextClicked.bind(this)
    this.openGoogleClicked = this.openGoogleClicked.bind(this)
    this.iPhoneInstructionsClicked = this.iPhoneInstructionsClicked.bind(this)
    this.androidInstructionsClicked = this.androidInstructionsClicked.bind(this)
    this.skipToGoogleInstructions = this.skipToGoogleInstructions.bind(this)
  }
  componentDidMount() {
    this.reset()
  }
  onGoogleModalClose(e) {
    this.state.showGoogle = false
    this.setState({...this.state})
  }
  reset() {
    this.state.showGoogle = false
    this.state.copyButtonText = `<i className="fas fa-copy"></i>&nbsp;Click to Copy URL`
    this.state.googleStep = 1
    this.setState({...this.state})
  }
  addClicked(e) {
    // this.props.calendarUrl
    this.reset()
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
    this.state.copyButtonText = `COPIED!`
    this.setState({...this.state})
    setTimeout(() => {
      this.state.googleStep = 2
      this.setState({...this.state})
    }, 500)

    //change icon state to show it was copied.
  }
  skipToGoogleInstructions(e) {
    this.state.googleStep = 3
    this.setState({...this.state})
  }
  openGoogleClicked(e) {
    //don't prevent propogate...
    this.state.googleStep = 3
    this.setState({...this.state})
  }
  iPhoneInstructionsClicked(e) {
    this.state.googleStep = 4
    this.setState({...this.state})
  }
  androidInstructionsClicked(e) {
    this.state.googleStep = 5
    this.setState({...this.state})
  }
  render() {
    return [
      (<a key="1" href="javascript:void(0)" className="btn btn-block btn-lg btn-primary" onClick={this.addClicked}><i className="fab fa-google"></i>&nbsp;Google Calendar</a>)
      ,(<Modal
          key="2"
          show={this.state.showGoogle}
          title="Google Calendar"
          onClose={this.onGoogleModalClose}
          showClose={true}
          showPrimary={false}
          closeText="OK"
          closeStyle="btn-secondary">
          <div className={`google-step-1 ${this.state.googleStep !== 1 ? "collapse" : ""}`}>
            <h3>Step 1 - Copy URL</h3>
            <button type="button" className="btn btn-sm btn-primary" onClick={this.copyTextClicked}><span dangerouslySetInnerHTML={{__html: this.state.copyButtonText}}></span></button>
          </div>
          <div className={`google-step-2 ${this.state.googleStep !== 2 ? "collapse" : ""}`}>
            <h3>Step 2 - Add Calendar by URL on Google</h3>
            <p>
              You will need to <em>Paste</em> into the <code>URL of calendar</code> field and click <code>Add calendar</code>.
            </p>
            <p>
              <img src="/images/google-screen.png" className="img-fluid img-help" />
            </p>
            <div className="card bg-light mb-3">
              <div className="card-body">
                <h5 className="card-text"><i className="fas fa-exclamation-triangle text-warning"/>&nbsp;Come back after adding the calendar for one more step.</h5>
              </div>
            </div>
            <p>
              <a target="_blank" href="https://calendar.google.com/calendar/r/settings/addbyurl" onClick={this.openGoogleClicked} className="btn btn-primary">Continue on Google</a>
              &nbsp;<button type="button" className="btn btn-secondary" onClick={this.skipToGoogleInstructions}>Skip to next step</button>
            </p>
          </div>
          <div className={`google-step-3 ${this.state.googleStep !== 3 ? "collapse" : ""}`}>
            <h3>Step 3 - Show the calendar in your Google Calendar app</h3>
            <p>Now that Google Calendar has subscribed to the calendar, you can view it in your Calendar app by toggling its visibiltiy. This is slightly different between iPhone and Android, so choose your phone to see instructions.</p>
            <p><button type="button" className="btn btn-secondary" onClick={this.iPhoneInstructionsClicked}><i className="fab fa-apple"/>&nbsp;iPhone</button>&nbsp;<button type="button" className="btn btn-success" onClick={this.androidInstructionsClicked}><i className="fab fa-android"/>&nbsp;Android</button></p>
          </div>
          <div className={`google-step-4 ${this.state.googleStep !== 4 ? "collapse" : ""}`}>
            <h3><i className="fab fa-apple"/>&nbsp;iPhone - Show the calendar</h3>
            <hr/>
            <p>Open the calendar app menu.</p>
            <p><img src="/images/google-open-menu.jpeg" className="img-fluid img-help"  /></p>
            <hr/>
            <p>Scroll to the bottom and check the new calendar.</p>
            <p><img src="/images/google-show-calendar.png" className="img-fluid img-help" /></p>
          </div>
          <div className={`google-step-5 ${this.state.googleStep !== 5 ? "collapse" : ""}`}>
            <h3><i className="fab fa-android text-success"/> Android - Show the calendar</h3>
            <hr/>
            <p>Open the calendar app menu and the Settings menu (bottom).</p>
            <p><img src="/images/android-open-settings.png" className="img-fluid img-help" /></p>
            <hr/>
            <p>Scroll down and you'll see calendars. You may need to click <code>Show more.</code> to see the new ones.</p>
            <p><img src="/images/android-reveal.png" className="img-fluid img-help" /></p>
            <p><img src="/images/android-cal-settings.png" className="img-fluid img-help" /></p>
            <p>View the settings for the Kickers - Spring 2019 calendar and enable <code>sync</code>.</p>
            <p><img src="/images/android-sync.png" className="img-fluid img-help" /></p>
            <p>All done! You should see Kickers' events in your calendar app!</p>
          </div>
        </Modal>)
    ]
  }
}

GoogleButton.propTypes = {
  calendarUrl: PropTypes.string.isRequired
}

export default GoogleButton
