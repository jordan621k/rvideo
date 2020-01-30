import React from 'react';
import DropDownMenu from './DropDownMenu';
import '../css/Form.css';

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

  componentDidMount() {
    window.gapi.load('client', () => {
        window.gapi.client.init({
            'apiKey': 'AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0',
            'scope': 'profile',
        })
    });
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();

    window.gapi.client.request({
      'path': 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&locale=zh-TW&maxResults=20&regionCode=TW&key=AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0',
    }).then(function(response) {
      console.log(response.result.items);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
});
  }

  updateCountry(country) {
    this.setState({country: country});
  }

  updateCategory(category) {
    this.setState({category: category});
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
