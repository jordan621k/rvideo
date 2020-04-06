import React from 'react'
import DropDownMenu from './DropDownMenu'
import '../css/Form.less'
import { videoList, isLoading } from '../store/VideoStore'
import { i18n, LocaleContext } from '../i18n/i18n'
import { withRouter } from 'react-router-dom'

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = ({ })
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateCategory = this.updateCategory.bind(this)
    this.countryOptions = {
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
    }
    this.categoryOptions = {
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
    }
  }

  componentDidMount () {
    window.gapi.load('client', () => {
      window.gapi.client.init({
        apiKey: 'AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0',
        scope: 'profile'
      })
      console.log(this.context)
      const defaultCountryCode = this.getQueryParam('country', 'US')
      const defaultCategoryCode = this.getQueryParam('category', '0')
      this.getYoutubeVideos(
        { value: Object.entries(this.countryOptions).filter((option) => { return option[1] === defaultCountryCode })[0][0], code: defaultCountryCode },
        { value: Object.entries(this.categoryOptions).filter((option) => { return option[1] === defaultCategoryCode })[0][0], code: defaultCategoryCode }
      )
    })
  }

  getQueryParam (param, defaultValue) {
    const result = new URLSearchParams(this.props.history.location.search).get(param)
    return result === null ? defaultValue : result
  }

  async getYoutubeVideos (country, category) {
    try {
      const youtubePromise = window.gapi.client.request({
        path: `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=${country.code}&videoCategoryId=${category.code}&key=AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0`
      })
      const response = await youtubePromise
      const responseResult = response.result
      if (responseResult && responseResult.pageInfo && responseResult.pageInfo.totalResults === 0) {
        this.updateErrorType('noVideo')
      } else {
        const sortedVideos = responseResult.items.sort((a, b) => (parseInt(a.statistics.viewCount) < parseInt(b.statistics.viewCount)) ? 1 : -1)
        videoList.set(sortedVideos)
        this.setPreviousState(country, category)
      }
    } catch (error) {
      const errorBody = JSON.parse(error.body)
      console.log(errorBody)
      this.updateErrorType('noCategory')
    } finally {
      isLoading.set(false)
      this.setState({ country: country, category: category })
      this.props.history.push(`?category=${this.state.category.code}&country=${this.state.country.code}`)
    }
  }

  setPreviousState (country, category) {
    this.setState({ previousCategory: category, previousCountry: country })
  }

  handleSubmit (country, category) {
    if (JSON.stringify(country) === JSON.stringify(this.state.previousCountry) &&
        JSON.stringify(category) === JSON.stringify(this.state.previousCategory) &&
        this.state.errorType !== null
    ) {
      this.updateErrorType(null)
      this.setState({ country: country, category: category })
      return
    }
    // event.preventDefault()
    isLoading.set(true)
    this.updateErrorType(null)
    this.getYoutubeVideos(country, category)
  }

  updateErrorType (message) {
    this.setState({ errorType: message })
  }

  updateCountry (country, countryCode) {
    this.handleSubmit({ value: country, code: countryCode }, this.state.category)
  }

  updateCategory (category, categoryCode) {
    this.handleSubmit(this.state.country, { value: category, code: categoryCode })
  }

  getCategoryDropDownProps () {
    return {
      name: 'categoryDropDownMenu',
      options: this.categoryOptions,
      initialValue: (this.state.category && this.state.category.value) || null,
      callback: this.updateCategory
    }
  }

  getCountryDropDownProps () {
    return {
      name: 'countryDropDownMenu',
      options: this.countryOptions,
      initialValue: (this.state.country && this.state.country.value) || null,
      callback: this.updateCountry
    }
  }

  getLanguageDropDownProps () {
    return {
      name: 'languageDropDownMenu',
      options: i18n(this.context.locale).form.dropDownOptions.language,
      initialValue: 'English'
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
        {this.state.errorType &&
          <div className="ErrorMessage">
            <p className="ErrorMessageText">{i18n(this.context.locale).form.errorType[this.state.errorType]}</p>
          </div>
        }
      </React.Fragment>
    )
  }
}

Form.contextType = LocaleContext

export default withRouter(Form)
