import React from 'react';
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
  'Music': '1',
  'Sports': '2',
  'News': '3',
  'Live': '4',
  'Pets': '5'
};

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
      <Header/>
      <div className="App">
        <DropDownMenu name={"countryDropDownMenu"} options={countries} placeholder={"USA"}/>
        <DropDownMenu name={"categoryDropDownMenu"} options={categories} placeholder={"ALL"}/>
      </div>
      <Footer/>
      </React.Fragment>
    );
  }
}

export default App;
