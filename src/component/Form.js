import React from 'react'
import DropDownMenu from './DropDownMenu'
import Video from './Video'
import '../css/Form.css'

class Form extends React.Component {

  constructor (props) {
    super(props)
    this.state = { videos: [] }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateCategory = this.updateCategory.bind(this)
  }

  componentDidMount () {
    window.gapi.load('client', () => {
      window.gapi.client.init({
        'apiKey': 'AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0',
        'scope': 'profile',
      })
    })
  }

  async getYoutubeVideos () {
    const youtubePromise = window.gapi.client.request({
      'path': 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&locale=zh-TW&maxResults=20&regionCode=TW&key=AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0',
    })

    const response = await youtubePromise;

    if (response.result.error) {
      console.log('Error: ' + response.result.error.message)
    } else {
      this.setState({ videos: response.result.items })
    }
    console.log(this.state)
  }

  handleSubmit (event) {
    event.preventDefault()
    this.getYoutubeVideos()
  }

  updateCountry (country) {
    this.setState({ country: country })
  }

  updateCategory (category) {
    this.setState({ category: category })
  }

  getCategoryDropDownProps () {
    return {
      name: 'categoryDropDownMenu',
      options: {
        'Music': '1',
        'Sports': '2',
        'News': '3',
        'Live': '4',
        'Pets': '5'
      },
      placeholder: 'ALL',
      callback: this.updateCategory
    }
  }

  getCountryDropDownProps () {
    return {
      name: 'countryDropDownMenu',
      options: {
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
      },
      placeholder: 'United States',
      callback: this.updateCountry
    }
  }

  sortVideobyCount (e) {
    e.props.viewCount.sort((a, b) => a - b)
  }

  render () {
    // this.sortVideobyCount(this.state.videos) videos[""0""].statistics.viewCount
    const unsortVideoList = Object.keys(this.state.videos).map((key) => {
      const video = this.state.videos[key]
      const rank = parseInt(key) + 1
      const videoProps = {
        title: video.snippet.title,
        rank: rank,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
        publishedAt: video.snippet.publishedAt.slice(0, 10),
        thumbnail: video.snippet.thumbnails.default.url,
        channelTitle: video.snippet.channelTitle,
        videoLink: 'https://www.youtube.com/watch?v=' + video.id
      }
      return <Video {...videoProps}/>
    })

    console.log(typeof unsortVideoList)
    //const sortedVideoList = this.sortVideobyCount(unsortVideoList)
    const sortedVideoList = unsortVideoList

    return (
      <React.Fragment>
        <form className="Form" onSubmit={this.handleSubmit}>
          <b>
            Watch trending {'{'}
            <DropDownMenu {...this.getCategoryDropDownProps()}/>{'} '}
            videos on Youtube from
            {' {'}
            <DropDownMenu {...this.getCountryDropDownProps()}/> {'}'} </b>
          <br/>
          <input type="submit" value="Submit"/>
        </form>
        {sortedVideoList}
      </React.Fragment>
    );
  }
}

export default Form
