import React from 'react'
import DropDownMenu from './DropDownMenu'
import '../css/Form.css'
import { videoList, isLoading } from '../store/VideoStore'

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = ({ })
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
    var requestPath = ''
    if (this.state.countryCode === 'ALL') {
      requestPath = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&videoCategoryId=${this.state.categoryCode}&key=AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0`
    } else {
      requestPath = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=${this.state.countryCode}&videoCategoryId=${this.state.categoryCode}&key=AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0`
    }
    const youtubePromise = window.gapi.client.request({
      path: requestPath
    })
    try {
      const response = await youtubePromise
      if (response.result.error) {
        console.log('Error: ' + JSON.stringify(response.result.error.message))
        window.alert(response.result.error.message)
      } else if (response.result.pageInfo.totalResults === 0) {
        this.setState({ errorMessage: 'The requested video chart is not supported or is not available.' })
      } else {
        const sortedVideos = response.result.items.sort((a, b) => (parseInt(a.statistics.viewCount) < parseInt(b.statistics.viewCount)) ? 1 : -1)
        videoList.set(sortedVideos)
      }
    } catch (error) {
      var errorBody = JSON.parse(error.body)
      console.log(errorBody)
      this.setState({ errorMessage: errorBody.error.message })
    }
    isLoading.set(false)
  }

  handleSubmit (event) {
    if (this.state.countryCode !== undefined && this.state.categoryCode !== undefined) {
      // event.preventDefault()
      isLoading.set(true)
      this.setState({ errorMessage: '' })
      this.getYoutubeVideos()
    }
  }

  updateCountry (country, countryCode) {
    this.setState({ countryCode: countryCode }, function () {
      this.handleSubmit()
    })
  }

  updateCategory (category, categoryCode) {
    this.setState({ categoryCode: categoryCode }, function () {
      this.handleSubmit()
    })
  }

  getCategoryDropDownProps () {
    return {
      name: 'categoryDropDownMenu',
      options: {
        'All': '0',
        'Action/Adventure': '32',
        'Anime/Animation': '31',
        'Autos & Vehicles': '2',
        'Classics': '33',
        'Comedy': '23',
        'Documentary': '35',
        'Drama': '36',
        'Education': '27',
        'Entertainment': '24',
        'Family': '37',
        'Film & Animation': '1',
        'Foreign': '38',
        'GamiNews & Politicsng': '25',
        'Gaming': '20',
        'Horror': '39',
        'Howto & Style': '26',
        'Movies': '30',
        'Music': '10',
        'Nonprofits & Activism': '29',
        'Pets & Animals': '15',
        'People & Blogs': '22',
        'Science & Technology': '28',
        'Sci-Fi/Fantasy': '40',
        'Shorts': '42',
        'Shows': '43',
        'Sports': '17',
        'Thriller': '41',
        'Trailers': '44',
        'Travel & Events': '19',
        'Videoblogging': '21'
      },
      placeholder: 'All',
      callback: this.updateCategory
    }
  }

  getCountryDropDownProps () {
    return {
      name: 'countryDropDownMenu',
      options: {
        'ALL': 'ALL',
        'Brazil': 'BR',
        'Canada': 'CA',
        'Japan': 'JP',
        'Korea': 'KP',
        'Spain': 'ES',
        'South Africa': 'ZA',
        'Taiwan': 'TW',
        'Thailand': 'TH',
        'United States': 'US',
        'United Kingdom': 'GB'
      },
      placeholder: 'All Countries',
      callback: this.updateCountry
    }
  }

  render () {
    return (
      <React.Fragment>
        <form className="Form" onSubmit={this.handleSubmit}>
          <b>
            <DropDownMenu {...this.getCategoryDropDownProps()}/>
            &nbsp; from &nbsp;
            <DropDownMenu {...this.getCountryDropDownProps()}/>
          </b>
          <br/>
        </form>
        {this.state.errorMessage &&
          <div className="ErrorMessage">
            <p className="ErrorMessageText">{this.state.errorMessage}</p>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default Form
