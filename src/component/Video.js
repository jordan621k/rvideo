import React from 'react'
import '../css/Video.css'

class Video extends React.Component {

  constructor (props) {
    super(props)
    this.openVideoInWindow = this.openVideoInWindow.bind(this)
  }

  openVideoInWindow () {
    window.open(this.props.videoLink)
  }

  render () {
    const { title, viewCount, likeCount, publishedAt, thumbnail, rank, channelTitle } = this.props
    return (
      <div id="videoblock" onMouseDown={this.openVideoInWindow}>
        <div id="rank">
          {rank}
        </div>
        <div id="videotitle">
          <b>{title}</b><br/>
        </div>
        <img id="videothumbnail" src={thumbnail}/>
        <div id="videoinfo">
          <b>CHANEL: {channelTitle}</b><br/>
          <b>VIEWS: {viewCount}</b><br/>
          <b>LIKES: {likeCount}</b><br/>
          <b>DATE: {publishedAt}</b><br/>
        </div>
      </div>
    )
  }
}

export default Video
