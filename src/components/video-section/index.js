import React, { useRef, useEffect } from "react"
import { useIntersection } from "react-use"
import styles from "./index.module.styl"
import cn from "classnames"

const VideoSection = ({ setIsVideoNavVisible, title, text, url, urlText, type, ...rest }) => {
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "20%",
  })
  useEffect(() => {
    if (intersection) {
      setIsVideoNavVisible(intersection.intersectionRatio === 0)
    }
  }, [intersection, setIsVideoNavVisible])

  return (
    <section className="px-14">
      <div className={cn(styles.videoSection, "relative")} id={type} {...rest}>
        <div
          ref={intersectionRef}
          className={cn(styles.videoSectionCheck, "absolute left-0 top-0 pointer-events-none")}
        />
        <iframe
          title="video-1"
          className="absolute left-0 top-0"
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/BF1nWBrOyDg?controls=0&modestbranding=1&rel=0"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  )
}

export default VideoSection
