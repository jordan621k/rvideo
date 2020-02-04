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
      <div onMouseDown={this.openVideoInWindow}>
        <div>
          {rank}
        </div>
        <div>
          <img src={thumbnail}/>
        </div>
        <div>
          <b>TITLE: {title}  </b><b>CHANEL: {channelTitle}</b><br/>
          <b>VIEWS: {viewCount}  </b>
          <b>LIKES: {likeCount}  </b>
          <b>DATE: {publishedAt}  </b>
        </div>
      </div>
    )
  }
}

export default Video
