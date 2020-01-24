import React from 'react';
import DropDownMenu from './DropDownMenu';

const countries = {
    'Brazil': 'BR',
    'Canada': 'CA',
    'Japan': 'JA',
    'Korea': 'KP',
    'Spain': 'ES',
    'South Africa': 'ZA',
    'United Kingdom': 'UK',
    'United States of America': 'US',
    'Thailand': 'TH',
    'Taiwan' : 'TW'
};
  
const categories = {
    'Music': '1',
    'Sports': '2',
    'News': '3',
    'Live': '4',
    'Pets': '5'
};

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  updateCountry(country) {
    this.setState({country: country});
  }

  updateCategory(category) {
    this.setState({category: category});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <DropDownMenu name={"countryDropDownMenu"} options={countries} placeholder={"USA"} callback={this.updateCountry}/>
        <DropDownMenu name={"categoryDropDownMenu"} options={categories} placeholder={"ALL"} callback={this.updateCategory}/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default Form;
