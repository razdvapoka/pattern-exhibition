import React, { useEffect, useCallback } from "react"
import cn from "classnames"
import styles from "./index.module.styl"

const VideoNav = ({ isVisible, setIsVideoNavVisible, isPlayerApiReady }) => {
  const handleNavClick = useCallback(() => {
    setIsVideoNavVisible(false)
    const el = document.querySelector(`#video-1`)
    if (el) {
      const rect = el.getBoundingClientRect()
      window.scrollTo({
        top: window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2,
        behavior: "smooth",
      })
    }
  }, [setIsVideoNavVisible])

  useEffect(() => {
    if (isPlayerApiReady) {
      const onPlayerReady = event => {
        event.target.mute()
        event.target.playVideo()
      }
      new window.YT.Player("navVideo", {
        height: "100%",
        width: "100%",
        videoId: "ncVEPsxbf0Y",
        muted: 1,
        playerVars: {
          controls: 0,
          enablejsapi: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: onPlayerReady,
        },
      })
    }
  }, [isPlayerApiReady])

  return (
    <button
      className={cn("fixed cursor-pointer z-20 overflow-hidden", styles.videoNav, {
        "opacity-0 pointer-events-none": !isVisible,
      })}
      onClick={handleNavClick}
    >
      <div className={cn(styles.videoBox, "absolute pointer-events-none")}>
        <div id="navVideo" />
      </div>
    </button>
  )
}

export default VideoNav
