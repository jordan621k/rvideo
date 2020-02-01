import React from 'react';
import DropDownMenu from './DropDownMenu';
import Video from './Video';
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
const videoresult = {

};

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {videolist: {}}
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
    //console.log(this.state);
    event.preventDefault();

    let videoresult

    window.gapi.client.request({
      'path': 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&locale=zh-TW&maxResults=20&regionCode=TW&key=AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0',
    }).then(function(response) {
      console.log(response.result.items);
      videoresult = response.result.items
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
});
      this.setState({videolist: videoresult});
      console.log(this.state)
  }

  updateCountry(country) {
    this.setState({country: country});
  }

  updateCategory(category) {
    this.setState({category: category});
  }

  render() {
    let videolist;

    // videolist = <div>
    //   {Object.keys(this.response.result.items).map((key) => {
    //     return <li key={this.response.result.items[key].snippet.localized.title}>
    //       {key}
    //     </li>
    //   })}
    //   </div>

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
      {/* <Video options={this.state.videoresults}/> */}
      {videolist}
      </form>
    );
  }
}

export default Form;
