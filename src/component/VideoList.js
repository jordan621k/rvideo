import React from 'react'
import Video from './Video'
import '../css/VideoList.css'
import { inject, observer } from "mobx-react"

@inject("VideoStore")
@observer
class VideoList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { videos: [] }
  }

  addCommmatoDigit (count) {
    if (count == null) {
      return '0'
    }
    var result = ''
    var digit = 0
    for (var i = count.length - 1; i >= 0; i--) {
      if (digit % 3 === 0 & i !== count.length - 1) {
        result = ',' + result
      }
      result = count[i] + result
      digit += 1
    }
    return result
  }

  render () {
    const videosList = Object.keys(this.state.videos).map((key) => {
      const video = this.state.videos[key]
      const rank = parseInt(key) + 1
      const videoProps = {
        title: video.snippet.title.trim(),
        rank: rank,
        viewCount: this.addCommmatoDigit(video.statistics.viewCount),
        likeCount: this.addCommmatoDigit(video.statistics.likeCount),
        publishedAt: video.snippet.publishedAt.slice(0, 10),
        thumbnail: video.snippet.thumbnails.default.url,
        channelTitle: video.snippet.channelTitle,
        videoLink: 'https://www.youtube.com/watch?v=' + video.id,
        channelLink: 'https://www.youtube.com/channel/' + video.snippet.channelId
      }
      return <Video {...videoProps}/>
    })

    return (
      <React.Fragment>
        {videosList}
      </React.Fragment>
    )
  }
}

export default VideoList
