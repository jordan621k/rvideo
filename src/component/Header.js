import React from 'react'
import '../css/Header.css'
import logo from '../static/logo.png'

class Header extends React.Component {
  render () {
    return (
      <header className="Header">
        <img src={logo} alt="logo" />
        <h6>Trending Videos on Youtube</h6>
      </header>
    )
  }
}

export default Header
