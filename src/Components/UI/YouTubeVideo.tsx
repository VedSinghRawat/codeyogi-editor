import { FC, memo } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'

type YouTubeVideoProps = YouTubeProps

const YouTubeVideo: FC<YouTubeVideoProps> = ({ videoId, iframeClassName = '', ...rest }) => {
  return <YouTube videoId={videoId} iframeClassName={`${iframeClassName} aspect-video w-full h-auto`} {...rest} />
}

YouTubeVideo.defaultProps = {}

export default memo(YouTubeVideo)
