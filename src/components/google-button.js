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
              You will need to <em>Paste</em> into the <code>URL of calendar</code> field and click <code>Add calendar</code>. That's it!
            </p>
            <p>
              <img src="/images/google-screen.png" className="img-fluid" style={{border: "dashed silver 4px"}}/>
            </p>
            <a href="https://calendar.google.com/calendar/r/settings/addbyurl" className="btn btn-primary">Continue on Google</a>
          </div>
        </Modal>)
    ]
  }
}

GoogleButton.propTypes = {
  calendarUrl: PropTypes.string.isRequired
}

export default GoogleButton
