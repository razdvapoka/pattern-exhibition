import React, { useState, useRef, useEffect } from "react"
import cn from "classnames"
import styles from "./index.module.styl"

const PatternTitle = ({ title, isHovered, className, isCurated }) => {
  const ref = useRef(null)
  const [isMarqueRequired, setIsMarqueeRequired] = useState(null)
  useEffect(() => {
    if (ref.current) {
      const textRect = ref.current.getBoundingClientRect()
      const boxRect = ref.current.parentElement.getBoundingClientRect()
      setIsMarqueeRequired(textRect.width > boxRect.width)
    }
  }, [ref])
  const textClassName = cn(
    "inline-block whitespace-no-wrap absolute left-0 pr-4",
    styles.patternTitleText
  )
  return (
    <div
      className={cn(
        styles.patternTitle,
        "relative overflow-hidden",
        {
          "opacity-0": isMarqueRequired === null,
        },
        className
      )}
    >
      {isMarqueRequired === null ? (
        <span ref={ref} className="whitespace-no-wrap">
          {title}
        </span>
      ) : isHovered && isMarqueRequired ? (
        <>
          <span className={cn(textClassName, "marquee-box-1")}>{title}</span>
          <span className={cn(textClassName, "marquee-box-2")}>{title}</span>
        </>
      ) : (
        <span className={cn("block truncate truncated-span", styles.patternTitleTruncated)}>
          {title}
        </span>
      )}
      {isMarqueRequired && (
        <div
          className={cn(
            "absolute top-0 right-0 h-full",
            isCurated ? styles.overlayCurated : styles.overlay,
            {
              [styles.overlayHidden]: isHovered,
            }
          )}
        />
      )}
    </div>
  )
}

export default PatternTitle
