import React from 'react'
import '../css/Video.less'
import PropTypes from 'prop-types'
import { i18n, LocaleContext } from '../i18n/i18n'

class Video extends React.Component {
  constructor (props) {
    super(props)
    this.openVideoInWindow = this.openVideoInWindow.bind(this)
    this.onMouseOverFunction = this.onMouseOverFunction.bind(this)
  }

  openVideoInWindow () {
    window.open(this.props.videoLink)
  }

  onMouseOverFunction (e) {
    this.changeMouseCursor(e)
    this.changeBoarder(e)
  }

  changeMouseCursor (e) {
    e.target.style.cursor = 'pointer'
  }

  changeBoarder (e) {
    if (e.target.className === 'Video') {
      e.target.style.border = '#66fcf1 2px solid'
    }
  }

  unchangeBoarder (e) {
    if (e.target.className === 'Video') {
      e.target.style.border = '2px solid'
    }
  }

  render () {
    const { title, viewCount, likeCount, publishedAt, thumbnail, rank, channelTitle, channelLink, duration } = this.props
    return (
      <div className="Video" onMouseDown={this.openVideoInWindow} onMouseOver={this.onMouseOverFunction} onMouseLeave={this.unchangeBoarder}>
        <div className="Rank" id="DesktopRank">
          <h2>{rank}</h2>
        </div>
        <div className="Info">
          <div className="Title">
            <div className="Rank" id="MobileRank">
              <h2>{rank}</h2>
            </div>
            <div className="TitleText">
              <h3>{title}</h3>
            </div>
          </div>
          <div className="ThumbnailAndStats">
            <div className="ThumbnailAndDuration">
              <div className="ThumbnailBlock">
                <img className="Thumbnail" src={thumbnail} alt="Cover Image"/>
              </div>
              <div className="Duration">
                <p>&nbsp;{duration}&nbsp;</p>
              </div>
            </div>
            <div className="Stats">
              <p>{viewCount} {i18n(this.context.locale).video.views}</p>
              <p>{likeCount} {i18n(this.context.locale).video.likes}</p>
              <p>{i18n(this.context.locale).video.uploaded_by} <a href={channelLink}>{channelTitle}</a> {publishedAt}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Video.contextType = LocaleContext

Video.propTypes = {
  title: PropTypes.string,
  viewCount: PropTypes.string,
  likeCount: PropTypes.string,
  publishedAt: PropTypes.string,
  thumbnail: PropTypes.string,
  rank: PropTypes.number,
  channelTitle: PropTypes.string,
  channelLink: PropTypes.string,
  videoLink: PropTypes.string,
  duration: PropTypes.string
}

export default Video
