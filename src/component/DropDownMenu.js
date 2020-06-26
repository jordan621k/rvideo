import React from 'react'
import '../css/DropDownMenu.css'
import PropTypes from 'prop-types'

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
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  showDropDown () {
    this.setState({ showDropDown: true })
  }

  hideDropDown () {
    this.setState({ showDropDown: false })
  }

  highlightItem (e) {
    if (e.target) {
      e.target.classList.add('selected')
    } else {
      e.classList.add('selected')
    }
  }

  unHighlightItem (e) {
    if (e.target) {
      document.querySelectorAll('li.selected')[0].classList.remove('selected')
    } else {
      e.classList.remove('selected')
    }
  }

  populateInput (e) {
    const target = e.target ? e.target : e
    const input = document.getElementById(this.inputId)
    input.value = target.innerText
    this.resizeInput(target.innerText.length)
    this.props.callback(target.id)
    this.hideDropDown()
    input.blur()
  }

  resizeInput (size) {
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

  onKeyDown (e) {
    e.preventDefault()
    const selected = document.querySelectorAll('li.selected')[0] || document.getElementById(this.inputId)
    const dropDownOptions = document.getElementById(this.dropDownId).getElementsByTagName('li')
    const dropDownFirstOption = dropDownOptions[0]
    const dropDownLastOption = dropDownOptions[Object.keys(this.props.options).length - 1]
    const selectedIsLi = selected.tagName === 'LI'
    if (e.keyCode === 38) {
      if (selectedIsLi && selected.previousSibling) {
        this.highlightItem(selected.previousSibling)
        this.unHighlightItem(selected)
      } else {
        this.highlightItem(dropDownLastOption)
        this.unHighlightItem(selected)
      }
    } else if (e.keyCode === 40) {
      if (selectedIsLi && selected.nextSibling) {
        this.highlightItem(selected.nextSibling)
        this.unHighlightItem(selected)
      } else {
        this.highlightItem(dropDownFirstOption)
        this.unHighlightItem(selected)
      }
    } else if (e.keyCode === 13) {
      this.populateInput(selected)
    }
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
          value={this.props.value}
          // size={this.props.placeholder.length}
          onKeyDown={this.onKeyDown}
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
