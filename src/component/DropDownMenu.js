import React from 'react';
import '../css/DropDownMenu.css';

class DropDownMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {options: this.props.options, showDropDown: false};
    this.inputId = this.props.name + "-input";
    this.dropDownId = this.props.name + "-dropdown";
    this.showDropDown = this.showDropDown.bind(this);
    this.filter = this.filter.bind(this);
    this.hideDropDown = this.hideDropDown.bind(this);
    this.highlightItem = this.highlightItem.bind(this);
    this.populateInput = this.populateInput.bind(this);
  }

  showDropDown() {
    this.setState({showDropDown: true});
  }

  hideDropDown() {
    this.setState({showDropDown: false});
  }

  highlightItem(e){
    e.target.style.background = '#c7c6c3';
  }

  unHighlightItem(e){
    e.target.style.background = 'white';
  }

  populateInput(e){
    document.getElementById(this.inputId).value = e.target.innerHTML;
  }

  filter() {
    let filteredOptions = {};

    Object.keys(this.props.options).forEach((key) => {
      if (key.toLowerCase().includes(document.getElementById(this.inputId).value)) {
        filteredOptions[key] = this.props.options[key]
      }
    });

    this.setState({options: filteredOptions});
  }

  render() {
    let dropDownMenu;

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
               placeholder={this.props.placeholder}
               onFocus={this.showDropDown}
               onChange={this.filter}
               onBlur={this.hideDropDown}
        />
        {dropDownMenu}
      </div>
    );
  }
}

export default DropDownMenu;
