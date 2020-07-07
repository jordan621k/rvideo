import React from 'react'
import '../css/Header.less'
import logo from '../static/logo.png'
import { i18n, LocaleContext } from '../i18n/i18n'
import Form from './Form'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'

class Header extends React.Component {

  constructor (props) {
    super(props)
    this.history = createBrowserHistory()
  }

  render () {
    return (
      <header className="Header">
        <div className="logoAndText">
          <img className="logoImage" src={logo} alt="logo" />
        </div>
        <div className="formBlock">
          <h6>{i18n(this.context.locale).header}</h6>
          <Router history={this.history}>
            <Form/>
          </Router>
        </div>
        <div className="block"></div>
      </header>
    )
  }
}

Header.contextType = LocaleContext

export default Header
