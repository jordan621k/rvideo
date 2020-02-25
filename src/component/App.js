import React from 'react'
import '../css/App.css'
import Header from './Header'
import Footer from './Footer'
import Form from './Form'
import VideoList from './VideoList'

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Header/>
        <div className="App">
          <Form/>
          <VideoList/>
        </div>
        <Footer/>
      </React.Fragment>
    )
  }
}

export default App
