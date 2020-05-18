import { FormattedMessage } from "gatsby-plugin-intl"
import { format, isWithinInterval } from "date-fns"
import React, { useEffect, useRef, useState, useCallback } from "react"
import cn from "classnames"

import { blank } from "@/utils"
import Markdown from "@/components/markdown"
import Play from "@/icons/play.inline.svg"
import Plus from "@/icons/plus.inline.svg"

import PatternTitle from "./components/pattern-title"
import Section from "../section"
import styles from "./index.module.styl"

const PatternTags = ({ tags, isOpen }) => {
  return (
    <div className="flex flex-wrap">
      {tags.map((tag, tagIndex) => (
        <span
          className={cn(styles.patternTag, "inline-block bg-greyTagBg text-xs-F", {
            "opacity-0": !isOpen && tagIndex >= 2,
          })}
          key={tagIndex}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

const Audio = ({ curator }) => {
  const audioRef = useRef(null)
  const handlePlayClick = useCallback(
    e => {
      e.stopPropagation()
      const player = audioRef.current
      if (player) {
        if (player.paused) {
          player.play()
        } else {
          player.pause()
        }
      }
    },
    [audioRef]
  )
  return (
    <div className="flex items-center bg-greyTagBg p-2 sm:text-white" onClick={handlePlayClick}>
      <audio ref={audioRef} src={curator.audio.file.url} />
      <button className={cn(styles.playButton, "mr-1")}>
        <Play />
      </button>
      <span className="text-xs-F">
        {`${curator.name} `}
        <FormattedMessage id="curatorIdea" />
      </span>
    </div>
  )
}

const PatternCurator = ({ curator }) => {
  return (
    <div>
      <div className="text-xs-F-b">
        <FormattedMessage id="curatedBy" />
        {` ${curator.nameInstrumental}`}
      </div>
      <div className="mt-10">
        {curator.audio ? (
          <Audio curator={curator} />
        ) : (
          <Markdown className="text-xs-F-h">{curator.idea.idea}</Markdown>
        )}
      </div>
    </div>
  )
}

const ScheduleItem = ({ pattern, curator, start, end }) => {
  const isInProgress = isWithinInterval(new Date(), { start, end })
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [realHeight, setRealHeight] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const toggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen, setIsOpen])

  const updateRealHeight = useCallback(() => {
    const titleCol = ref.current.querySelector(".pattern-title-column")
    const tagsCol = ref.current.querySelector(".pattern-tags-column")
    const mobileItem = ref.current.querySelector(".mobile-schedule-item")
    const titleColRect = titleCol.getBoundingClientRect()
    const tagsColRect = tagsCol.getBoundingClientRect()
    const mobileItemRect = mobileItem.getBoundingClientRect()
    const maxHeight = Math.max(titleColRect.height, tagsColRect.height, mobileItemRect.height)
    setRealHeight(maxHeight)
  }, [ref, setRealHeight])

  const handleResize = useCallback(() => {
    if (isOpen) {
      setIsOpen(false)
    }
    window.requestAnimationFrame(updateRealHeight)
  }, [updateRealHeight, isOpen, setIsOpen])

  useEffect(() => {
    if (ref.current) {
      updateRealHeight()
    }
  }, [ref, updateRealHeight])

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [ref, handleResize])

  return (
    <div
      ref={ref}
      className={cn(
        styles.scheduleItem,
        "overflow-hidden px-4 sm:px-2 my-grid cursor-pointer text-greyText hover:text-white",
        curator || isHovered ? "bg-greyBg" : "bg-blackBg"
      )}
      role="button"
      tabIndex={0}
      onClick={toggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={e => e.which === 32 && setIsHovered(!isHovered)}
      style={
        isOpen
          ? {
              height: realHeight,
            }
          : {}
      }
    >
      <div className="col-start-1 col-span-1 p-4 flex justify-center sm:hidden">
        <img
          className={styles.patternThumbnail}
          src={pattern.thumbnail.fixed.src}
          alt="pattern thumbnail"
        />
      </div>
      <div
        className={cn(
          "col-start-2 col-span-1 text-xs-L uppercase sm:hidden",
          styles.patternExternalId
        )}
      >
        {curator ? (
          <FormattedMessage id="curatedPattern" />
        ) : pattern.isMosaic ? (
          <FormattedMessage id="mosaicPattern" />
        ) : (
          <span>
            <FormattedMessage id="pattern" />
            {` ${pattern.externalId}`}
          </span>
        )}
      </div>
      <div className={cn("col-start-3 col-span-3 text-xs-F px-2 pattern-title-column sm:hidden")}>
        <div className={cn(styles.patternTitle, "pb-7")}>
          <PatternTitle className="text-xs-F-b" isHovered={isHovered} title={pattern.title} />
          <a
            href={curator ? curator.url : `https://ornamika.com/pattern/${pattern.externalId}`}
            {...blank()}
            className={cn("inline-block mt-10 text-xs-L uppercase", styles.learnMore)}
            onClick={e => {
              e.stopPropagation()
            }}
          >
            <FormattedMessage id={curator ? "learnMore" : "openPattern"} />
            <span className="text-xs-A"> ↗</span>
          </a>
        </div>
      </div>
      <div className={cn("col-start-7 col-span-1 text-xs-F-b sm:hidden", styles.patternExternalId)}>
        {isInProgress ? (
          <span className={cn("relative", styles.patternInProgress)}>
            <FormattedMessage id="inProgress" />
          </span>
        ) : (
          `${format(start, "HH:mm")} – ${format(end, "HH:mm")}`
        )}
      </div>
      <div className={cn("col-start-9 col-span-3 pattern-tags-column sm:hidden")}>
        <div className={cn("pb-7", styles.patternTags)}>
          {curator ? (
            <PatternCurator curator={curator} isOpen={isOpen} />
          ) : pattern.tags ? (
            <PatternTags tags={pattern.tags} isOpen={isOpen} />
          ) : null}
        </div>
      </div>
      <div className={cn("col-start-12 col-span-1 flex justify-end pt-8 sm:hidden")}>
        <Plus className={isOpen ? styles.iconPlusRotated : styles.iconPlus} />
      </div>
      <div className="mobile-schedule-item hidden sm:block">
        <div className="flex items-center pt-6">
          <div className="">
            <img
              className={styles.patternThumbnail}
              src={pattern.thumbnail.fixed.src}
              alt="pattern thumbnail"
            />
          </div>
          <div className="pl-2 text-white text-xsm-F">
            {`${isInProgress ? "∙ " : ""}${format(start, "HH:mm")}`}
            {!isInProgress && <span className="opacity-0">∙ </span>}
          </div>
          <div className={cn("text-xsm-F text-white ml-2 relative", styles.patternTitleM)}>
            <PatternTitle
              className={cn("sm:normal-case", styles.patternTitleMInner)}
              isHovered={isOpen}
              title={pattern.title}
            />
            {curator && (
              <div className="text-xs-F absolute left-0" style={{ color: "#6e6e6e", top: "100%" }}>
                <FormattedMessage id="curatedBy" />
                {` ${curator.nameInstrumental}`}
              </div>
            )}
          </div>
          <div className="flex-1 flex justify-end text-white">
            <Plus className={isOpen ? styles.iconPlusRotated : styles.iconPlus} />
          </div>
        </div>
        <div className="mt-9 ml-17 pb-3">
          {curator ? (
            curator.audio ? (
              <Audio curator={curator} />
            ) : (
              <Markdown className="text-xs-F text-white mr-9">{curator.idea.idea}</Markdown>
            )
          ) : pattern.tags ? (
            <PatternTags tags={pattern.tags} isOpen />
          ) : null}
          <div className="mt-12 flex item-center justify-between text-xss-L uppercase text-white">
            {curator ? (
              <FormattedMessage id="curatedPattern" />
            ) : pattern.isMosaic ? (
              <FormattedMessage id="mosaicPattern" />
            ) : (
              <span>
                <FormattedMessage id="pattern" />
                {` ${pattern.externalId}`}
              </span>
            )}
            <a
              href={curator ? curator.url : `https://ornamika.com/pattern/${pattern.externalId}`}
              {...blank()}
              className={styles.learnMore}
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <FormattedMessage id={curator ? "learnMore" : "openPattern"} />
              <span className="text-xs-A"> ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const ScheduleSection = ({
  schedule: { currentPatternIndex, items, todaySchedule },
  updatedAt = new Date(),
  ...rest
}) => {
  const scheduleItems =
    currentPatternIndex !== -1
      ? items.slice(currentPatternIndex, currentPatternIndex + 10)
      : todaySchedule
      ? todaySchedule.items
      : []

  return (
    <Section className="bg-blackBg text-white mt-26 sm:mt-14 pt-10 sm:pt-5" {...rest}>
      <div className={cn("mt-27 sm:mt-7", styles.scheduleGrid)}>
        {scheduleItems.map((item, itemIndex) => (
          <ScheduleItem key={itemIndex} {...item} />
        ))}
      </div>
      <div className="flex justify-center text-xs-alt text-xs-F text-white opacity-50 sm:hidden">
        <div className="mt-8 mb-10">
          <FormattedMessage id="lastUpdate" />
          {` ${format(
            todaySchedule ? new Date(todaySchedule.updatedAt) : new Date(),
            "dd.MM.yy HH:mm"
          )}`}
        </div>
      </div>
    </Section>
  )
}

export default ScheduleSection
