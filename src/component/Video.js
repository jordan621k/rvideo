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
      <div className="Video" onMouseDown={this.openVideoInWindow}>
        <div className="rank">
          {rank}
        </div>
        <div className="videotitle">
          <b>{title}</b><br/>
        </div>
        <div className="videoimageandinfo">
          <img className="videothumbnail" src={thumbnail}/>
          <div className="videoinfo">
            <b>CHANEL: {channelTitle}</b><br/>
            <b>VIEWS: {viewCount}</b><br/>
            <b>LIKES: {likeCount}</b><br/>
            <b>DATE: {publishedAt}</b><br/>
          </div>
        </div>
      </div>
    )
  }
}

export default Video
