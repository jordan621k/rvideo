import React from 'react';
import '../css/Video.css';

class Video extends React.Component {

    constructor(props) {
        super(props);
        this.gotoYoutube = this.gotoYoutube.bind(this);
    }
    
    gotoYoutube() {
        window.open(this.props.videoLink);
    }

    render() {
    let {title, viewCount, likeCount, publishedAt, thumbnail, rank, channelTitle} = this.props
    return (
        <React.Fragment>
            <div onMouseDown={this.gotoYoutube}>
                <div>{rank}</div>
                <div><img src={thumbnail}/></div>
                <div>
                <b>TITLE: {title}  </b><b>CHANEL: {channelTitle}</b><br/>
                <b>VIEWS: {viewCount}  </b>
                <b>LIKES: {likeCount}  </b>
                <b>DATE: {publishedAt}  </b>
                </div>
            </div>
        </React.Fragment>
        )
    }
}

export default Video;
