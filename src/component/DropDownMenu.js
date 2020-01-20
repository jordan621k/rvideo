import React from 'react';

class DropDownMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {options: this.props.options};
    this.inputId = this.props.id + "-input";
    this.dropDownId = this.props.id + "-dropdown";
    this.showDropDown = this.showDropDown.bind(this);
    this.filter = this.filter.bind(this);
    this.hideDropDown = this.hideDropDown.bind(this);
    this.highlightItem = this.highlightItem.bind(this);
  }

  componentDidMount() {

  }

  showDropDown() {
    document.getElementById(this.dropDownId).style.display = ""
  }

  hideDropDown() {
    document.getElementById(this.dropDownId).style.display = "none"
  }

  highlightItem(e){
    e.target.style.background = 'red';
  }

  unHighlightItem(e){
    e.target.style.background = 'white';
  }

  filter() {

    let updatedState = {};

    Object.keys(this.props.options).forEach((key) => {
      if (key.toLowerCase().includes(document.getElementById(this.inputId).value)) {
        updatedState[key] = this.props.options[key]
      }
    });

    console.log(updatedState);

    this.setState({options: updatedState});
  }

  render() {

    console.log(this.state.options);

    return (
      <React.Fragment>
        <input id={this.inputId} type={Text} className="DropDownMenu" onFocus={this.showDropDown} onChange={this.filter} onBlur={this.hideDropDown}>
        </input>
        <ui id={this.dropDownId} style={{display: 'none'}}>
          {Object.keys(this.state.options).map((key) => {
            return <li onMouseOver={this.highlightItem}
                       onMouseLeave={this.unHighlightItem}
                       key={this.state.options[key]}>
                        {key}
                  </li>
          })}
        </ui>
      </React.Fragment>
    );
  }
}

export default DropDownMenu;
