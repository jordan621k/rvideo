import React from 'react';
import '../css/Video.css';

class Video extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <React.Fragment>
        <h1>{this.props.title}</h1>
        <h1>{this.props.rank}</h1>
        <h1>{this.props.view}</h1>
        <h1>{this.props.like}</h1>
        <h1>{this.props.date}</h1>
      </React.Fragment>
      );
  }
}
export default Video;
