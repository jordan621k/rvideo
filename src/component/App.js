import React from 'react'
import '../css/App.css'
import Header from './Header'
import Footer from './Footer'
import Form from './Form'
import VideoList from './VideoList'
import { i18n, LocaleContext } from '../i18n/i18n'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.history = createBrowserHistory()
    this.state = {
      locale: 'en',
      updateLocale: (language, localeCode, countryCode, categoryCode) => {
        this.setState({
          locale: localeCode
        })
        document.getElementById('languageDropDownMenu-input').value =
          Object.entries(i18n(localeCode).form.dropDownOptions.language).filter(
            (option) => { return option[1] === localeCode }
          )[0][0]
        document.getElementById('countryDropDownMenu-input').value =
          Object.entries(i18n(localeCode).form.dropDownOptions.country).filter(
            (option) => { return option[1] === countryCode }
          )[0][0]
        document.getElementById('categoryDropDownMenu-input').value =
          Object.entries(i18n(localeCode).form.dropDownOptions.category).filter(
            (option) => { return option[1] === categoryCode }
          )[0][0]
      }
    }
  }

  render () {
    return (
      <LocaleContext.Provider value={this.state}>
        <Header/>
        <div className="App">
          <Router history={this.history}>
            <Form/>
          </Router>
          <VideoList/>
        </div>
        <Footer/>
      </LocaleContext.Provider>
    )
  }
}

export default App
