import React from 'react'
import '../css/Header.css'
import logo from '../static/logo.png'
import { i18n, LocaleContext } from '../i18n/i18n'

class Header extends React.Component {
  render () {
    return (
      <header className="Header">
        <img src={logo} alt="logo" />
        <h6>{i18n(this.context.locale).header}</h6>
      </header>
    )
  }
}

Header.contextType = LocaleContext

export default Header
