import React from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import Header from './Header';
import Footer from './Footer';
import DropDownMenu from './DropDownMenu';


const countries = {
  'Brazil': 'BR',
  'Canada': 'CA',
  'Japan': 'JA',
  'Korea': 'KP',
  'Spain': 'ES',
  'South Africa': 'ZA',
  'United Kingdom': 'UK',
  'United States of America': 'US',
  'Thailand': 'TH',
  'Taiwan' : 'TW'
};

const categories = {
  'Music': '',
  'Sports': '',
  'News': '',
  'Live': '',
  'Pets': ''
};

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
      <Header></Header>
      <div className="App">
        <DropDownMenu id={"countryDropDownMenu"} options={countries}></DropDownMenu>
        <DropDownMenu id={"categoryDropDownMenu"} options={categories}></DropDownMenu>
      </div>
      <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default App;
