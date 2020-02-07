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
        apiKey: 'AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0',
        scope: 'profile'
      })
    })
  }

  async getYoutubeVideos () {
    const youtubePromise = window.gapi.client.request({
      path: `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&locale=zh-+TW&maxResults=20&regionCode=${this.state.countryCode}&videoCategoryId=${this.state.categoryCode}&key=AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0`
    })

    const response = await youtubePromise

    if (response.result.error) {
      console.log('Error: ' + response.result.error.message)
      // todo: show error message
    } else {
      const sortedVideos = response.result.items.sort((a, b) => (parseInt(a.statistics.viewCount) < parseInt(b.statistics.viewCount)) ? 1 : -1)
      this.setState({ videos: sortedVideos })
    }
    console.log(this.state)
  }

  handleSubmit (event) {
    event.preventDefault()
    this.getYoutubeVideos()
  }

  updateCountry (country, countryCode) {
    // this.setState({ country: country })
    this.setState({ countryCode: countryCode })
  }

  updateCategory (category, categoryCode) {
    // this.setState({ category: category })
    this.setState({ categoryCode: categoryCode })
  }

  getCategoryDropDownProps () {
    return {
      name: 'categoryDropDownMenu',
      options: {
        'Film & Animation': '1',
        'Autos & Vehicles': '2',
        'Music': '10',
        'Pets & Animals': '15',
        'Sports': '17',
        'Short Movies': '18',
        'Travel & Events': '19',
        'Gaming': '20',
        'Videoblogging': '21',
        'People & Blogs': '22',
        'Comedy': '23',
        'Entertainment': '24',
        'GamiNews & Politicsng': '25',
        'Howto & Style': '26',
        'Education': '27',
        'Science & Technology': '28',
        'Nonprofits & Activism': '29',
        // 'Movies': '30',
        'Anime/Animation': '31',
        'Action/Adventure': '32',
        'Classics': '33',
        'Comedy': '34',
        'Documentary': '35',
        'Drama': '36',
        'Family': '37',
        'Foreign': '38',
        'Horror': '39',
        'Sci-Fi/Fantasy': '40',
        'Thriller': '41',
        'Shorts': '42',
        'Shows': '43',
        'Trailers': '44'
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
        'Japan': 'JP',
        'Korea': 'KP',
        'Spain': 'ES',
        'South Africa': 'ZA',
        'United Kingdom': 'UK',
        'United States of America': 'US',
        'Thailand': 'TH',
        'Taiwan': 'TW'
      },
      placeholder: 'United States',
      callback: this.updateCountry
    }
  }

  render () {
    const videosList = Object.keys(this.state.videos).map((key) => {
      const video = this.state.videos[key]
      const rank = parseInt(key) + 1
      const videoProps = {
        title: video.snippet.title.trim(),
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
        {videosList}
      </React.Fragment>
    )
  }
}

export default Form
