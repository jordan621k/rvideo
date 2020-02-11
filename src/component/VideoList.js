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

  render () {
    let index = 0
    return (
      <React.Fragment>
        {videoList.get().map((video) => {
          const rank = index + 1
          const videoProps = {
            key: index,
            title: video.snippet.title.trim(),
            rank: rank,
            viewCount: this.addCommmaToDigit(video.statistics.viewCount),
            likeCount: this.addCommmaToDigit(video.statistics.likeCount),
            publishedAt: video.snippet.publishedAt.slice(0, 10),
            thumbnail: video.snippet.thumbnails.default.url,
            channelTitle: video.snippet.channelTitle,
            videoLink: 'https://www.youtube.com/watch?v=' + video.id,
            channelLink: 'https://www.youtube.com/channel/' + video.snippet.channelId
          }
          index = index + 1
          return <Video {...videoProps}/>
        })}
      </React.Fragment>
    )
  }
})

export default VideoList
