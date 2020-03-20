import React from 'react'
import '../css/App.css'
import Header from './Header'
import Footer from './Footer'
import Form from './Form'
import VideoList from './VideoList'
import { LocaleContext } from '../i18n/i18n'

class App extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      locale: 'en',
      updateLocale: (locale, localeCode) => {
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
          <Form/>
          <VideoList/>
        </div>
        <Footer/>
      </LocaleContext.Provider>
    )
  }
}

export default App
