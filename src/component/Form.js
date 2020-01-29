import React from 'react';
import DropDownMenu from './DropDownMenu';
import '../css/Form.css';

const axios = require('axios');

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
    this.execute()
  }

  updateCountry(country) {
    this.setState({country: country});
  }

  updateCategory(category) {
    this.setState({category: category});
  }

  // Make sure the client is loaded and sign-in is complete before calling this method.
  execute() { 
  // Make a request for a user with a given ID
  axios({
    method: 'get',
    url: 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&locale=zh-TW&maxResults=20&regionCode=TW&key=AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0',
    responseType: 'json',
    headers: {Authorization: 'Bearer AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0',
              Accept: 'application/json'}
    }).then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }

  

  render() {
    return (
      <form className="Form" onSubmit={this.handleSubmit}>
        <b>
            Watch trending {'{'}
            <DropDownMenu name={"categoryDropDownMenu"} options={categories} placeholder={"All"} callback={this.updateCategory}/>{'} '}
            videos on Youtube from
            {' {'}
            <DropDownMenu name={"countryDropDownMenu"} options={countries} placeholder={"United States"} callback={this.updateCountry}/> {'}'} </b>
        <br/>
      <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default Form;
