import React from 'react'
import PropTypes from 'prop-types'

class Modal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false
    }

    this.refModal = React.createRef()
    this.modalInstance = null

    this.onPrimaryClick = this.onPrimaryClick.bind(this)
    this.onCloseClick = this.onCloseClick.bind(this)
    this.onModalClosed = this.onModalClosed.bind(this)
    this.onShown = this.onShown.bind(this)
  }
  componentDidMount() {
    this.state.show = this.props.show
    this.setState(this.state)
    this.modalInstance = $(this.refModal.current).modal({show: this.state.show}).appendTo("body")
    this.modalInstance.on("hidden.bs.modal", this.onModalClosed)
    this.modalInstance.on("shown.bs.modal", this.onShown)
  }
  componentWillUnmount() {
    this.modalInstance.off("hidden.bs.modal")
    this.modalInstance.data('bs.modal', null)
    delete this.modalInstance
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.show !== this.props.show) {
      if (this.props.show)
        this.open()
      else this.close()
    }
  }

  //when controlled remotely via props
  static getDerivedStateFromProps(props, state) {
    if (props.show !== state.show) {
      return {show: props.show}
    }
    return null
  }

  close() {
    this.state.show = false
    this.setState(this.state)
    this.modalInstance.modal("hide")
  }
  open() {
    this.state.show = true
    this.setState(this.state)
    this.modalInstance.modal("show")
  }
  onShown(e) {
    if (this.props.onShown) this.props.onShown(e)
  }
  onCloseClick(e) {
    this.close()
  }
  onModalClosed(e) {
    if (this.props.onClose) this.props.onClose(e)
  }
  onPrimaryClick(e) {
    if (this.props.onPrimary) {
      let result = this.props.onPrimary(e)

      //if not defined or if truthy; auto-close
      if (typeof result === "undefined" || result) this.close()
    }
  }
  render() {
    return (
      <div ref={this.refModal} className="modal fade" tabIndex="-1" role="dialog">
        <div className={`modal-dialog ${this.props.modalAdditionalCss}`} role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
              {this.props.showClose && !this.props.busyIndicator ? (<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCloseClick}><span aria-hidden="true">&times;</span></button>) : null}
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              {this.props.showClose ? (<button type={this.props.closeButtonType} onClick={this.onCloseClick} disabled={this.props.busyIndicator} className={`btn ${this.props.closeStyle}`} data-dismiss="modal">{this.props.closeText}</button>) : null}
              {this.props.showPrimary ? (<button type={this.props.primaryButtonType} onClick={this.onPrimaryClick} disabled={this.props.busyIndicator} className={`btn ${this.props.primaryStyle}`}>
                {this.props.busyIndicator ? (
                  <div className={`spinner-border spinner-border-sm ${this.props.busyIndicatorTextStyle}`} role="status">
                    <span className="sr-only">{this.props.busyIndicatorText}</span>
                  </div>
                ) : null}
                {this.props.primaryText}
              </button>) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  title: PropTypes.string.isRequired
  ,show: PropTypes.bool.isRequired
  ,onPrimary: PropTypes.func
  ,onClose: PropTypes.func
  ,onShown: PropTypes.func
  ,primaryStyle: PropTypes.string
  ,modalAdditionalCss: PropTypes.string
  ,primaryText: PropTypes.string
  ,primaryButtonType: PropTypes.string
  ,closeText: PropTypes.string
  ,closeStyle: PropTypes.string
  ,showClose: PropTypes.bool
  ,showPrimary: PropTypes.bool
  ,busyIndicator: PropTypes.bool
  ,busyIndicatorText: PropTypes.string
  ,busyIndicatorTextStyle: PropTypes.string
}

Modal.defaultProps = {
  title: ""
  ,show: false
  ,primaryStyle: "btn-primary"
  ,primaryText: "OK"
  ,modalAdditionalCss: ""
  ,showPrimary: true
  ,primaryButtonType: "button"
  ,closeStyle: "btn-secondary"
  ,closeText: "Close"
  ,closeButtonType: "button"
  ,showClose: false
  ,busyIndicator: false
  ,busyIndicatorText: "Processing..."
  ,busyIndicatorTextStyle: ""
}

export default Modal
