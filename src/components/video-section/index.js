import React, { useState, useRef, useEffect } from "react"
import { useIntersection } from "react-use"
import styles from "./index.module.styl"
import cn from "classnames"

const VideoSection = ({
  setIsVideoNavVisible,
  title,
  text,
  subText,
  type,
  isInFooter,
  isPlayerApiReady,
  videoId,
  videoSrc,
  className,
  ...rest
}) => {
  const intersectionRef = useRef(null)
  const [player, setPlayer] = useState(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "20%",
  })
  useEffect(() => {
    if (intersection) {
      const isVisible = intersection.intersectionRatio !== 0
      setIsVideoNavVisible(!isVisible)
      if (player) {
        const state = player.getPlayerState()
        if (isVisible && state !== 1) {
          player.playVideo()
        }
        if (!isVisible && state === 1) {
          player.pauseVideo()
        }
      }
    }
  }, [intersection, setIsVideoNavVisible, player])
  useEffect(() => {
    if (isPlayerApiReady) {
      const onPlayerReady = event => {
        event.target.mute()
        setPlayer(event.target)
      }
      new window.YT.Player(videoId, {
        height: "100%",
        width: "100%",
        videoId: videoSrc,
        muted: 1,
        playerVars: {
          controls: 1,
          enablejsapi: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          loop: 1,
          playlist: videoSrc,
        },
        events: {
          onReady: onPlayerReady,
        },
      })
    }
  }, [isPlayerApiReady, setPlayer, videoId, videoSrc])

  return (
    <section className={cn("px-4 sm:px-0", className)}>
      <div className={cn(styles.videoSection, "relative")} id={type} {...rest}>
        <div
          ref={intersectionRef}
          className={cn(styles.videoSectionCheck, "absolute left-0 top-0 pointer-events-none")}
        />
        <div className="absolute left-0 top-0 w-full h-full">
          <div id={videoId} />
        </div>
      </div>
    </section>
  )
}

export default VideoSection
