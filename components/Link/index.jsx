import React, { Component, PropTypes } from "react"
import "./styles.scss"
import Location from "../../core/Location"

function isLeftClickEvent(event) {
  return event.button === 0
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

class Link extends Component {

  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node,
    state: PropTypes.object,
    onClick: PropTypes.func,
  };

  static handleClick = event => {
    let allowTransition = true
    let clickResult

    if (this && this.props && this.props.onClick) {
      clickResult = this.props.onClick(event)
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return
    }

    if (clickResult === false || event.defaultPrevented === true) {
      allowTransition = false
    }

    event.preventDefault()

    if (allowTransition) {
      const link = event.currentTarget
      if (this && this.props) {
        Location.push({
          pathname: this.props.to,
          search: this.props.state,
        })
      } else {
        if (link.host === window.location.host) {
          Location.push({
            pathname: link.pathname,
            search: link.search,
          })
        } else {
          window.location = link.href
        }
      }
    }
  };

  render() {
    const { to, children, ...props } = this.props
    return <a {...props} href={to} onClick={Link.handleClick.bind(this)}>{children}</a>
  }

}

export default Link
