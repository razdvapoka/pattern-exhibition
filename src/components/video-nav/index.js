import React, {
  //useState,
  useEffect,
  useCallback,
} from "react"
import cn from "classnames"
import styles from "./index.module.styl"

const VideoNav = ({ isVisible, setIsVideoNavVisible }) => {
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

  useEffect(
    () => {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"

      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      const onPlayerReady = event => {
        event.target.mute()
        event.target.playVideo()
      }
      window.onYouTubeIframeAPIReady = function () {
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
          },
          events: {
            onReady: onPlayerReady,
          },
        })
        // setPlayer(player)
      }
    },
    [
      //setPlayer
    ]
  )

  return (
    <div
      className={cn("fixed cursor-pointer z-20 overflow-hidden", styles.videoNav, {
        "opacity-0 pointer-events-none": !isVisible,
      })}
      onClick={handleNavClick}
    >
      <div className={cn(styles.videoBox, "absolute pointer-events-none")}>
        <div id="navVideo" />
      </div>
    </div>
  )
}

export default VideoNav
