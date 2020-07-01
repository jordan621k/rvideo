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
      locale: 'en_us',
      updateLocale: (localeCode) => {
        this.setState({
          locale: localeCode
        })
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
