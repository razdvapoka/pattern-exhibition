import { IntlContextConsumer, FormattedMessage } from "gatsby-plugin-intl"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import React, { useCallback, useState, useRef, useEffect } from "react"
import cn from "classnames"

import { COLORS } from "../../consts"
import { blank } from "../../utils"
import { useRandomColor } from "../../hooks/useRandomColor"
import Markdown from "../markdown"
import Section from "../section"
import styles from "./index.module.styl"

const Curator = ({
  randomColorIndex,
  updateRandomColorIndex,
  isMobile,
  curator,
  start,
  end,
  isInProgress,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const Component = curator.url ? "a" : "div"
  const props = curator.url ? { href: curator.url, ...blank() } : {}
  const handleMouseEnter = useCallback(() => {
    updateRandomColorIndex()
    setIsHovered(true)
  }, [setIsHovered, updateRandomColorIndex])
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [setIsHovered])
  return (
    <IntlContextConsumer>
      {({ language }) => (
        <Component
          className={cn(
            `w-1/4 sm:bg-${COLORS[index % COLORS.length].bodyBg} block sm:mr-1`,
            styles.curator,
            isHovered && !isMobile && randomColorIndex != null
              ? `bg-${COLORS[randomColorIndex].bodyBg}`
              : "bg-lightGrey"
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          <div
            className={cn(
              styles.time,
              `flex items-center justify-between pl-2 pr-18 sm:pr-16 text-xs-F uppercase
              sm:bg-${COLORS[index % COLORS.length].topBg}
              `,
              isHovered && !isMobile && randomColorIndex != null
                ? `bg-${COLORS[randomColorIndex].topBg}`
                : "bg-pale"
            )}
          >
            <div>{format(start, "dd MMMM", language === "ru" ? { locale: ru } : {})}</div>
            <div>
              {format(start, "HH:mm")}-{format(end, "HH:mm")}
            </div>
          </div>
          <div className="pt-10 pl-2 pr-12 sm:pr-8 pb-4">
            <div className={cn("text-m-F-stable uppercase", styles.name)}>{curator.name}</div>
            <Markdown className={cn("text-xs-F-h overflow-hidden", styles.description)}>
              {curator.description.description}
            </Markdown>
            {curator.url && (
              <div className={cn("text-xs-L uppercase mt-6 hover:underline", styles.more)}>
                <FormattedMessage id="curatorMore" />
              </div>
            )}
          </div>
        </Component>
      )}
    </IntlContextConsumer>
  )
}

const CuratorsSection = ({ curatedPatterns, ...rest }) => {
  const ref = useRef(null)
  const [slider, setSlider] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { randomColorIndex, updateRandomColorIndex } = useRandomColor()
  useEffect(() => {
    const Flickity = require("flickity")
    if (window.innerWidth < 640 && ref.current) {
      const slider = new Flickity(ref.current, {
        prevNextButtons: false,
        pageDots: false,
        on: {
          change: index => {
            setCurrentIndex(index)
          },
        },
      })
      setSlider(slider)
    }
  }, [ref, setSlider, setCurrentIndex])
  return (
    <Section className="mt-40 sm:px-0" {...rest}>
      <div
        className={cn(
          "flex flex-wrap sm:block sm:w-screen mt-12 sm:overflow-hidden sm:hidden",
          styles.curators
        )}
      >
        {curatedPatterns.map((curatedPattern, curatorIndex) => (
          <Curator
            key={curatorIndex}
            index={curatorIndex}
            randomColorIndex={randomColorIndex}
            updateRandomColorIndex={updateRandomColorIndex}
            {...curatedPattern}
          />
        ))}
      </div>
      <div
        ref={ref}
        className={cn("sm:w-screen mt-12 sm:overflow-hidden hidden sm:block", styles.curators)}
      >
        {curatedPatterns.map((curatedPattern, curatorIndex) => (
          <Curator isMobile key={curatorIndex} index={curatorIndex} {...curatedPattern} />
        ))}
      </div>
      <div className="bg-lightGrey mt-3 hidden sm:flex">
        <div
          className={cn(styles.slider, "bg-grey", {
            [styles.sliderFirst]: currentIndex === 0,
            [styles.sliderLast]: currentIndex === curatedPatterns.length - 1,
          })}
          style={{
            width: `${(1 / curatedPatterns.length) * 100}%`,
            transform: `translateX(${currentIndex * 100}%)`,
          }}
        />
      </div>
    </Section>
  )
}

export default CuratorsSection
