import React from 'react'
import '../css/Header.less'
import logo from '../static/logo.png'
import { i18n, LocaleContext } from '../i18n/i18n'
import DropDownMenu from './DropDownMenu'

class Header extends React.Component {

  getLanguageDropDownProps () {
    return {
      name: 'languageDropDownMenu',
      options: i18n(this.context.locale).dropDownOptions.language,
      value: i18n(this.context.locale).dropDownOptions.language[this.context.locale]
    }
  }

  render () {
    return (
      <LocaleContext.Consumer>
        {({ locale, updateLocale }) => (
          <header className="Header">
            <div className="logo">
              <img className="logoImage" src={logo} alt="logo" />
            </div>
            <div className="titleBlock">
              <h6>{i18n(this.context.locale).header}</h6>
            </div>
            <div className="languageDropDown">
              <DropDownMenu {...this.getLanguageDropDownProps()} callback={updateLocale}/>
            </div>
          </header>
        )}
      </LocaleContext.Consumer>
    )
  }
}

Header.contextType = LocaleContext

export default Header
