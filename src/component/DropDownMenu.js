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
    this.keyReaction = this.keyReaction.bind(this)
  }

  showDropDown () {
    this.setState({ showDropDown: true })
  }

  hideDropDown () {
    this.setState({ showDropDown: false })
  }

  highlightItem (e) {
    e.target.classList.add('selected')
  }

  unHighlightItem (e) {
    // e.target.classList.remove('selected')
    if (document.querySelectorAll("li.selected")[0]) {
      document.querySelectorAll("li.selected")[0].classList.remove('selected')
    }
  }

  populateInput (e) {
      document.getElementById(this.inputId).value = e.target.innerText
      this.resizeInput(e.target.innerText.length)
      this.props.callback(e.target.id)
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

  keyReaction (e) {
    e.preventDefault()
    var curSelected = document.querySelectorAll("li.selected")[0] || document.getElementById(this.inputId)
    var dropDownFirstOption = document.getElementById(this.dropDownId).getElementsByTagName("li")[0]
    if (e.keyCode == 38) {
      if (curSelected.tagName == "LI" && curSelected.previousSibling) {
        curSelected.previousSibling.classList.add('selected')
        curSelected.classList.remove('selected')
      }
    } else if (e.keyCode == 40) {
      if (curSelected.tagName == "LI" && curSelected.nextSibling) {
        curSelected.nextSibling.classList.add('selected')
        curSelected.classList.remove('selected')
      } else {
        dropDownFirstOption.classList.add('selected')
        curSelected.classList.remove('selected')
      }
    } else if (e.keyCode == 13) {
      document.getElementById(this.inputId).value = curSelected.innerText
      this.resizeInput(curSelected.innerText.length)
      this.props.callback(curSelected.id)
      this.hideDropDown()
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
          onKeyDown={this.keyReaction}
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
