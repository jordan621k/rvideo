import React from 'react'
import '../css/Video.less'
import PropTypes from 'prop-types'
import { i18n, LocaleContext } from '../i18n/i18n'

class Video extends React.Component {
  constructor (props) {
    super(props)
    this.openVideoInWindow = this.openVideoInWindow.bind(this)
    this.addBorderAndMouseCursor = this.addBorderAndMouseCursor.bind(this)
    this.removeBorder = this.removeBorder.bind(this)
  }

  openVideoInWindow () {
    window.open(this.props.videoLink)
  }

  addBorderAndMouseCursor (e) {
    if (e.target.className === 'Video') {
      e.target.classList.add('selected')
    }
  }

  removeBorder (e) {
    if (document.querySelectorAll('div.Video.selected')[0]) {
      document.querySelectorAll('div.Video.selected')[0].classList.remove('selected')
    }
  }

  showUploadInfo () {
    if (this.context.locale === 'zh_tw') {
      return this.props.publishedAt + i18n(this.context.locale).video.uploadedBy
    }
    return i18n(this.context.locale).video.uploadedBy + this.props.publishedAt
  }

  render () {
    const { title, viewCount, likeCount, thumbnail, rank, channelTitle, channelLink, duration } = this.props
    return (
      <div className="Video" onMouseDown={this.openVideoInWindow} onMouseOver={this.addBorderAndMouseCursor} onMouseLeave={this.removeBorder}>
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
              <p><a href={channelLink}>{channelTitle}</a> {this.showUploadInfo()}</p>
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
