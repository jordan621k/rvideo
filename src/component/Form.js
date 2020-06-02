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
  }

  componentDidMount () {
    window.gapi.load('client', () => {
      window.gapi.client.init({
        apiKey: 'AIzaSyAN6WGBl3-zqdtlabrDV428Tn3zrlpeAW0',
        scope: 'profile'
      })
      const defaultCountryCode = this.getQueryParam('country', 'US')
      const defaultCategoryCode = this.getQueryParam('category', '0')
      this.getYoutubeVideos(
        { value: i18n(this.context.locale).dropDownOptions.country[defaultCountryCode], code: defaultCountryCode },
        { value: i18n(this.context.locale).dropDownOptions.category[defaultCategoryCode], code: defaultCategoryCode }
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

  updateCountry (countryCode) {
    this.handleSubmit({ value: i18n(this.context.locale).dropDownOptions.country[countryCode], code: countryCode }, this.state.category)
  }

  updateCategory (categoryCode) {
    this.handleSubmit(this.state.country, { value: i18n(this.context.locale).dropDownOptions.category[categoryCode], code: categoryCode })
  }

  getCategoryDropDownProps () {
    return {
      name: 'categoryDropDownMenu',
      options: i18n(this.context.locale).dropDownOptions.category,
      value: (this.state.category && this.state.category.value) || null,
      callback: this.updateCategory
    }
  }

  getCountryDropDownProps () {
    console.log((this.state.country && this.state.country.value) || null)
    console.log(this.state)
    return {
      name: 'countryDropDownMenu',
      options: i18n(this.context.locale).dropDownOptions.country,
      value: (this.state.country && this.state.country.value) || null,
      callback: this.updateCountry
    }
  }

  render () {
    return (
      <React.Fragment>
        <LocaleContext.Consumer>
          {({ locale, updateLocale }) => (
            <form className="Form" onSubmit={this.handleSubmit}>
              <b>
                <DropDownMenu {...this.getCategoryDropDownProps()}/>
                &nbsp; {i18n(this.context.locale).form.from} &nbsp;
                <DropDownMenu {...this.getCountryDropDownProps()}/>
                &nbsp; {i18n(this.context.locale).form.in} &nbsp;
                <DropDownMenu
                  name='languageDropDownMenu'
                  options={i18n(this.context.locale).dropDownOptions.language}
                  value={i18n(this.context.locale).dropDownOptions.language[this.context.locale]}
                  callback={updateLocale}
                />
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
