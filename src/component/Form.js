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
    this.state = {showVideo: false}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.showVideo = this.showVideo.bind(this);
  }

  componentDidMount() {
    window.gapi.load('client', () => {
        window.gapi.client.init({
            'apiKey': 'AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0',
            'scope': 'profile',
        })
    });
  }

  showVideo() {
    this.setState({showVideo: true})
  }

  async getYoutubeVideos() {
    const youtubePromise = window.gapi.client.request({
      'path': 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&locale=zh-TW&maxResults=20&regionCode=TW&key=AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0',
    });

    const response = await youtubePromise;

    if (response.result.error)  {
        console.log('Error: ' + response.result.error.message);
    } else {
        this.setState({videos: response.result.items});
        this.showVideo()
    }

    console.log(this.state)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getYoutubeVideos()
  }

  updateCountry(country) {
    this.setState({country: country});
  }

  updateCategory(category) {
    this.setState({category: category});
  }

  render() {
    let videolist;

    if (this.state.showVideo) {
      videolist = <div id={this.videoListId} className="videolist">
      {Object.keys(this.state.videos).map((key) => {
        return <li key={this.state.videos[key]}>
            Rank:{key}<p></p>
            {this.state.videos[key].snippet.title}<p></p>
            {this.state.videos[key].statistics.viewCount}<p></p>
            {this.state.videos[key].statistics.likeCount}<p></p>
            {this.state.videos[key].snippet.publishedAt}<p></p>
          </li>
        })}
      </div>
    }

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
      {videolist}
      </form>
    );
  }
}

export default Form;
