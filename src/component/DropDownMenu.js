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
  }

  componentDidUpdate () {
    if (document.getElementById(this.inputId).value.length === 0) {
      document.getElementById(this.inputId).value = this.props.initialValue
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
    this.props.callback(e.target.innerText, this.props.options[e.target.innerText])
  }

  resizeInput (size) {
    const { initialValue } = this.props

    if (size <= initialValue.length) {
      size = initialValue.length
    }
    document.getElementById(this.inputId).size = size
  }

  filter () {
    this.setState({ input: document.getElementById(this.inputId).value.toLowerCase() })
  }

  render () {
    let dropDownMenu
    if (this.state.showDropDown) {
      dropDownMenu = <div id={this.dropDownId} className="dropDownMenu">
        {Object.keys(this.props.options).filter(
          (key) => { return this.state.input === undefined || key.toLowerCase().includes(this.state.input) }
        ).map((key) => {
          return <li onMouseOver={this.highlightItem}
            onMouseLeave={this.unHighlightItem}
            onMouseDown={this.populateInput}
            key={this.props.options[key]}>
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
          // size={this.props.placeholder.length}
          onFocus={this.showDropDown}
          onKeyUp={this.filter}
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
