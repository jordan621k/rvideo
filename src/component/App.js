import React from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
      <Header></Header>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default App;
