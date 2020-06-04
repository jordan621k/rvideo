import React from 'react'
import '../css/DropDownMenu.css'
import PropTypes from 'prop-types'
import { i18n, LocaleContext} from '../i18n/i18n'
import { toJS } from 'mobx'

class DropDownMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = { showDropDown: false }
    this.inputId = this.props.name + '-input'
    this.dropDownId = this.props.name + '-dropdown'
    this.showDropDown = this.showDropDown.bind(this)
    this.filter = this.filter.bind(this)
    this.hideDropDown = this.hideDropDown.bind(this)
    this.highlightItem = this.highlightItem.bind(this)
    this.populateInput = this.populateInput.bind(this)
    this.resizeInput = this.resizeInput.bind(this)
  }

  componentDidUpdate () {
    if (document.getElementById(this.inputId).value.length === 0) {
      document.getElementById(this.inputId).value = this.props.initialValue
    }
    if (this.inputId === 'languageDropDownMenu-input') {
      this.currentLanguageCode = Object.entries(this.props.options).filter((option) => { return option[1] === document.getElementById('languageDropDownMenu-input').value })[0][0]
    }
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
    if (this.inputId === 'languageDropDownMenu-input') {
      this.countryCode = Object.entries(i18n(this.currentLanguageCode).dropDownOptions.country).filter((option) => { return option[1] === document.getElementById('countryDropDownMenu-input').value })[0][0]
      this.categoryCode = Object.entries(i18n(this.currentLanguageCode).dropDownOptions.category).filter((option) => { return option[1] === document.getElementById('categoryDropDownMenu-input').value })[0][0]
      this.props.callback(e.target.id, this.countryCode, this.categoryCode)
    } else {
      this.props.callback(e.target.id)
    }
  }

  resizeInput (size) {
    const { initialValue } = this.props

    if (size <= initialValue.length) {
      size = initialValue.length
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
        {Object.keys(this.props.options).map((key) => {
          return <li onMouseOver={this.highlightItem}
            onMouseLeave={this.unHighlightItem}
            onMouseDown={this.populateInput}
            id={key}
            key={key}>
            {this.props.options[key]}
          </li>
        })}
      </div>
    }
    return (
      <div className="dropDown">
        <input id={this.inputId}
          className="dropDownInput"
          autoComplete="off"
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
  initialValue: PropTypes.string,
  options: PropTypes.object,
  callback: PropTypes.func,
  name: PropTypes.string
}

export default DropDownMenu
