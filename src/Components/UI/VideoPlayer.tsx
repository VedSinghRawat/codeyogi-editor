import { FC, memo, useCallback, useEffect, useRef } from 'react'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
import 'video.js/dist/video-js.css'

export interface VideoPlayerProps {
  onReady?: (player: Player) => void
  src: string
  className?: string
}

const VideoPlayer: FC<VideoPlayerProps> = ({ src, className = '', onReady }) => {
  const videoRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<Player>()

  const handleKeyControles = useCallback(
    (event: KeyboardEvent) => {
      const activeElementName = document.activeElement?.tagName
      if (activeElementName === 'TEXTAREA' || activeElementName === 'INPUT') return

      const keyPressed = event.key
      const player = playerRef.current
      const seekTime = 5

      if (player) {
        if (keyPressed === ' ') {
          event.preventDefault()
          const isPaused = player.paused()
          if (isPaused) {
            void player.play()
          } else {
            const isFullScreened = player.isFullscreen()
            isFullScreened && void player.exitFullscreen()
            player.pause()
          }
        } else if (keyPressed === 'ArrowRight') {
          const remainingTime = player.remainingTime()
          const canSeekForward = remainingTime >= seekTime
          const totalDuration = player.duration()

          if (canSeekForward) {
            const timePassed = totalDuration - remainingTime
            player.currentTime(timePassed + seekTime)
          } else {
            player.currentTime(totalDuration)
          }
        } else if (keyPressed === 'ArrowLeft') {
          const remainingTime = player.remainingTime()
          const totalDuration = player.duration()
          const timePassed = totalDuration - remainingTime
          const canSeekbackword = timePassed >= seekTime

          if (canSeekbackword) {
            player.currentTime(timePassed - seekTime)
          } else {
            player.currentTime(0)
          }
        } else if (keyPressed === 'f' || keyPressed === 'F') {
          const isFullScreened = player.isFullscreen()
          if (isFullScreened) {
            void player.exitFullscreen()
          } else {
            void player.requestFullscreen()
          }
        }
      }
    },
    [playerRef]
  )

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js')

      videoElement.className = 'vjs-big-play-centered ' + className

      if (videoRef.current) {
        videoRef.current.appendChild(videoElement)

        const player = videojs(videoElement, {}, () => {
          onReady && onReady(player)
        })

        playerRef.current = player
      }
    }
  }, [src, videoRef])

  // setup the plaeyer
  useEffect(() => {
    const player = playerRef.current
    const sources = [{ src, type: 'video/mp4' }]

    if (player) {
      player.src(sources)
      player.controls(true)
      player.playbackRates([0.25, 0.5, 1, 1.5, 2])
    }
  }, [playerRef])

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = undefined
      }
    }
  }, [playerRef])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyControles)
    return () => {
      window.removeEventListener('keydown', handleKeyControles)
    }
  }, [])

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  )
}

export default memo(VideoPlayer)
