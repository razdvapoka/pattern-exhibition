import React, {
  //useState,
  useEffect,
  useCallback,
} from "react"
import cn from "classnames"
import styles from "./index.module.styl"

const VideoNav = ({ isVisible, setIsVideoNavVisible, isPlayerApiReady }) => {
  //const [player, setPlayer] = useState(null)

  const handleNavClick = useCallback(() => {
    setIsVideoNavVisible(false)
    const el = document.querySelector(`#video-1`)
    if (el) {
      el.scrollIntoView({
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
        videoId: "BF1nWBrOyDg",
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
  }, [
    //setPlayer
    isPlayerApiReady,
  ])

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
