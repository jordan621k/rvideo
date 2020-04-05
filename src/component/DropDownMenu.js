import React from 'react'
import '../css/DropDownMenu.css'
import PropTypes from 'prop-types'

class DropDownMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = { options: this.props.options, showDropDown: false }
    this.inputId = this.props.name + '-input'
    this.dropDownId = this.props.name + '-dropdown'
    this.showDropDown = this.showDropDown.bind(this)
    this.filter = this.filter.bind(this)
    this.hideDropDown = this.hideDropDown.bind(this)
    this.highlightItem = this.highlightItem.bind(this)
    this.populateInput = this.populateInput.bind(this)
    this.resizeInput = this.resizeInput.bind(this)
  }

  showDropDown () {
    this.setState({ showDropDown: true })
  }

  hideDropDown () {
    this.setState({ showDropDown: false })
  }

  highlightItem (e) {
    e.target.style.background = '#45A291'
  }

  unHighlightItem (e) {
    e.target.style.background = '#0b0c10'
  }

  populateInput (e) {
    document.getElementById(this.inputId).value = e.target.innerText
    this.resizeInput(e.target.innerText.length)
    this.props.callback(e.target.innerText, this.props.options[e.target.innerText])
  }

  resizeInput (size) {
    const { value } = this.props

    if (size <= value.length) {
      size = value.length
    }
    document.getElementById(this.inputId).size = size
  }

  filter () {
    const input = document.getElementById(this.inputId).value.toLowerCase()
    const filteredOptions = {}

    this.resizeInput(input.length)

    Object.keys(this.props.options).forEach((key) => {
      if (key.toLowerCase().includes(input)) {
        filteredOptions[key] = this.props.options[key]
      }
    })

    this.setState({ options: filteredOptions })
  }

  render () {
    let dropDownMenu

    if (this.state.showDropDown) {
      dropDownMenu = <div id={this.dropDownId} className="dropDownMenu">
        {Object.keys(this.state.options).map((key) => {
          return <li onMouseOver={this.highlightItem}
            onMouseLeave={this.unHighlightItem}
            onMouseDown={this.populateInput}
            key={this.state.options[key]}>
            {key}
          </li>
        })}
      </div>
    }
    return (
      <div className="dropDown">
        <input id={this.inputId}
          className="dropDownInput"
          autoComplete="off"
          value={this.props.value}
          // size={this.props.placeholder.length}
          onFocus={this.showDropDown}
          onChange={this.filter}
          onBlur={this.hideDropDown}
        />
        {dropDownMenu}
      </div>
    )
  }
}

DropDownMenu.propTypes = {
  value: PropTypes.string,
  options: PropTypes.object,
  callback: PropTypes.func,
  name: PropTypes.string
}

export default DropDownMenu
