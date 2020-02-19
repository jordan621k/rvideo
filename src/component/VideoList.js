import React from 'react'
import Video from './Video'
import '../css/VideoList.css'
import { observer } from 'mobx-react'
import { videoList } from '../store/VideoStore'

const VideoList = observer(class VideoList extends React.Component {
  constructor (props) {
    super(props)
  }

  addCommmaToDigit (count) {
    if (count == null) {
      return '0'
    }
    var result = ''
    var digit = 0
    for (var i = count.length - 1; i >= 0; i--) {
      if (digit % 3 === 0 && i !== count.length - 1) {
        result = ',' + result
      }
      result = count[i] + result
      digit += 1
    }
    return result
  }

  turnDateToDaysAgo (date) {
    date = new Date(date)
    const today = new Date()
    const diff = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) / (1000 * 60 * 60 * 24))
    if (diff === 1) {
      return diff + ' day ago'
    }
    return diff + ' days ago'
  }

  convertDuration (duration) {
    var result = ''
    var tmp = ''
    var isAlpha = function (ch) {
      return typeof ch === 'string' && ch.length === 1 && ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'))
    }
    for (var i = 2; i < duration.length; i++) {
      if (isAlpha(duration[i])) {
        if (tmp.length !== 2) {
          tmp = '0' + tmp
        }
        result = result + tmp + ':'
        tmp = ''
      }
      else {
        tmp += duration[i]
      }
    }
    if (result[0] === '0') {
      return result.substring(1, result.length - 1)
    }
    return result.substring(0, result.length - 1)
  }

  pickThumbnail (video) {
    if (video.maxres && video.maxres.url) {
      return video.maxres.url
    } else if (video.high.url && video.high.url) {
      return video.high.url
    } else if (video.standard && video.standard.url) {
      return video.standard.url
    } else if (video.medium && video.medium.url) {
      return video.medium.url
    }
    return video.default.url
  }

  showPage () {
    document.getElementById('loader').style.display = 'none'
    document.getElementById('videoList').style.display = 'block'
  }

  render () {
    let index = 0
    return (
      <React.Fragment>
        <div id='loader'></div>
        <div id='videoList'>
          {videoList.get().map((video) => {
            const rank = index + 1
            const videoProps = {
              key: index,
              title: video.snippet.title.trim(),
              rank: rank,
              viewCount: this.addCommmaToDigit(video.statistics.viewCount),
              likeCount: this.addCommmaToDigit(video.statistics.likeCount),
              publishedAt: this.turnDateToDaysAgo(video.snippet.publishedAt),
              thumbnail: this.pickThumbnail(video.snippet.thumbnails),
              channelTitle: video.snippet.channelTitle,
              videoLink: 'https://www.youtube.com/watch?v=' + video.id,
              channelLink: 'https://www.youtube.com/channel/' + video.snippet.channelId,
              duration: this.convertDuration(video.contentDetails.duration)
            }
            index = index + 1
            return <Video {...videoProps}/>
          })}
        </div>
      </React.Fragment>
    )
  }
})

export default VideoList
