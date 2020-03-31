import React from 'react'
import DropDownMenu from './DropDownMenu'
import '../css/Form.less'
import { videoList, isLoading } from '../store/VideoStore'
import { i18n, LocaleContext } from '../i18n/i18n'
import { withRouter } from 'react-router-dom'

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = ({})
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
      var defaultCountryCode = this.getQueryParam('country', 'US')
      var defaultCategoryCode = this.getQueryParam('category', '0')
      this.setState({ countryCode: defaultCountryCode, categoryCode: defaultCategoryCode })
      this.getYoutubeVideos(defaultCountryCode, defaultCategoryCode)
    })
  }

  getQueryParam (param, defaultValue) {
    var result = new URLSearchParams(this.props.history.location.search).get(param)
    return result === null ? defaultValue : result
  }

  async getYoutubeVideos (country, category) {
    const youtubePromise = window.gapi.client.request({
      path: `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=${country}&videoCategoryId=${category}&key=AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0`
    })
    try {
      const response = await youtubePromise
      const responseResult = response.result
      if (responseResult && responseResult.pageInfo && responseResult.pageInfo.totalResults === 0) {
        this.updateErrorMessage('There is no video for the selected category.')
      } else {
        const sortedVideos = responseResult.items.sort((a, b) => (parseInt(a.statistics.viewCount) < parseInt(b.statistics.viewCount)) ? 1 : -1)
        videoList.set(sortedVideos)
        this.setPreviousState(country, category)
      }
    } catch (error) {
      const errorBody = JSON.parse(error.body)
      console.log(errorBody)
      this.updateErrorMessage(errorBody.error.message)
    } finally {
      isLoading.set(false)
      this.setState({ countryCode: country, categoryCode: category })
      this.props.history.push(`?category=${this.state.categoryCode}&country=${this.state.countryCode}`)
      console.log(this.state)
    }
  }

  setPreviousState (country, category) {
    this.setState({ previousCategoryCode: category, previousCountryCode: country })
  }

  handleSubmit (country, category) {
    console.log(this.state, country, category)
    if (country === this.state.previousCountryCode && category === this.state.previousCategoryCode && this.state.errorMessage !== null) {
      this.updateErrorMessage(null)
      return
    }
    // event.preventDefault()
    isLoading.set(true)
    this.updateErrorMessage(null)
    this.getYoutubeVideos(country, category)
  }

  updateErrorMessage (message) {
    this.setState({ errorMessage: message })
  }

  updateCountry (country, countryCode) {
    this.handleSubmit(countryCode, this.state.categoryCode)
  }

  updateCategory (category, categoryCode) {
    this.handleSubmit(this.state.countryCode, categoryCode)
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
      placeholder: 'United States',
      callback: this.updateCountry
    }
  }

  getLanguageDropDownProps () {
    return {
      name: 'languageDropDownMenu',
      options: {
        'Chinese': 'zh',
        'English': 'en'
      },
      placeholder: 'English'
    }
  }

  render () {

    return (
      <React.Fragment>
        <LocaleContext.Consumer>
          {({ updateLocale }) => (
            <form className="Form" onSubmit={this.handleSubmit}>
              <b>
                <DropDownMenu {...this.getCategoryDropDownProps()}/>
                &nbsp; {i18n(this.context.locale).form.from} &nbsp;
                <DropDownMenu {...this.getCountryDropDownProps()}/>
                &nbsp; {i18n(this.context.locale).form.in} &nbsp;
                <DropDownMenu {...this.getLanguageDropDownProps()} callback={updateLocale}/>
              </b>
              <br/>
            </form>
          )}
        </LocaleContext.Consumer>
        {this.state.errorMessage &&
          <div className="ErrorMessage">
            <p className="ErrorMessageText">{this.state.errorMessage}</p>
          </div>
        }
      </React.Fragment>
    )
  }
}

Form.contextType = LocaleContext

export default withRouter(Form)
