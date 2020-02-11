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
    const { title, viewCount, likeCount, publishedAt, thumbnail, rank, channelTitle, channelLink } = this.props
    return (
      <div className="Video" onMouseDown={this.openVideoInWindow}>
        <div className="Rank">
          <h2>{rank}</h2>
        </div>
        <div className="Info">
          <div className="Title">
            <h3>{title}</h3>
          </div>
          <div className="ThumbnailAndStats">
            <img className="Thumbnail" src={thumbnail}/>
            <div className="Stats">
              <p>{viewCount} Views</p>
              <p>{likeCount} Likes</p>
              <p>Uploaded by <a href={channelLink}>{channelTitle}</a> on {publishedAt}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Video
