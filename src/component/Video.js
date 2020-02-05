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
        <div className="Rank">
          <h2>{rank}</h2>
        </div>
        <div className="Title">
          <h3>{title}</h3>
        </div>
        <div className="videoimageandinfo">
          <img className="videothumbnail" src={thumbnail}/>
          <div className="videoinfo">
            <b>{viewCount} Views</b><br/>
            <b>{likeCount} Likes</b><br/>
            <b>Uploaded by {channelTitle} on {publishedAt}</b><br/>
          </div>
        </div>
      </div>
    )
  }
}

export default Video
