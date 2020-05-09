import { FormattedMessage } from "gatsby-plugin-intl"
import { format, isSameDay, addMinutes, isWithinInterval } from "date-fns"
import React, { useEffect, useRef, useMemo, useState, useCallback } from "react"
import cn from "classnames"

import { blank } from "@/utils"
import PatternTitle from "./components/pattern-title"
import Play from "@/icons/play.inline.svg"
import Plus from "@/icons/plus.inline.svg"
import X from "@/icons/x.inline.svg"

import Markdown from "@/components/markdown"
import styles from "./index.module.styl"

const PatternTags = ({ tags, isOpen }) => {
  return (
    <div className="flex flex-wrap">
      {tags.map((tag, tagIndex) => (
        <span
          className={cn(styles.patternTag, "inline-block bg-lightGrey", {
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

const PatternCurator = ({ curator }) => {
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
    <div>
      <div className="text-xs-alt uppercase">
        <FormattedMessage id="curatedBy" />
        {` ${curator.nameInstrumental}`}
      </div>
      <div className="mt-9">
        {curator.audio ? (
          <div className="flex items-center">
            <audio ref={audioRef} src={curator.audio.file.url} />
            <button className={cn(styles.playButton, "mr-1")} onClick={handlePlayClick}>
              <Play />
            </button>
            <span>
              {`${curator.name} `}
              <FormattedMessage id="curatorIdea" />
            </span>
          </div>
        ) : (
          <Markdown>{curator.description.description}</Markdown>
        )}
      </div>
    </div>
  )
}

const ScheduleItem = ({ pattern, curator, start, end }) => {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [realHeight, setRealHeight] = useState(0)

  const toggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen, setIsOpen])

  const updateRealHeight = useCallback(() => {
    const titleCol = ref.current.querySelector(".pattern-title-column")
    const tagsCol = ref.current.querySelector(".pattern-tags-column")
    const titleColRect = titleCol.getBoundingClientRect()
    const tagsColRect = tagsCol.getBoundingClientRect()
    const maxHeight = Math.max(titleColRect.height, tagsColRect.height)
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

  const isInProgress = isWithinInterval(new Date(), { start, end })
  return (
    <div
      ref={ref}
      className={cn(styles.scheduleItem, "overflow-hidden px-4 grid grid-cols-12 cursor-pointer", {
        "bg-grey": curator,
        "bg-pale": !curator,
      })}
      onClick={toggle}
      style={
        isOpen
          ? {
              height: realHeight,
            }
          : {}
      }
    >
      <div className="col-start-1 col-span-1 p-4 flex justify-center">
        <img
          className={styles.patternThumbnail}
          src={pattern.thumbnail.fixed.src}
          alt="pattern thumbnail"
        />
      </div>
      <div className={cn("col-start-2 col-span-1 text-xs uppercase", styles.patternExternalId)}>
        {curator ? (
          <FormattedMessage id="curatedPattern" />
        ) : pattern.isMosaic ? (
          <FormattedMessage id="mosaicPattern" />
        ) : (
          <span>
            <FormattedMessage id="pattern" />
            {` #${pattern.externalId}`}
          </span>
        )}
      </div>
      <div className={cn("col-start-3 col-span-3 text-xs-alt px-2 pattern-title-column")}>
        <div className={cn(styles.patternTitle, "pb-7")}>
          <PatternTitle title={pattern.title} />
          <a
            href={curator ? curator.url : `https://ornamika.com/pattern/${pattern.externalId}`}
            {...blank()}
            className={cn("inline-block mt-10 text-xs uppercase", styles.learnMore)}
            onClick={e => {
              e.stopPropagation()
            }}
          >
            <FormattedMessage id={curator ? "learnMore" : "openPattern"} />
          </a>
        </div>
      </div>
      <div className={cn("col-start-7 col-span-1 text-xs uppercase", styles.patternExternalId)}>
        {isInProgress ? (
          <span className={cn("text-red relative", styles.patternInProgress)}>
            <FormattedMessage id="inProgress" />
          </span>
        ) : (
          `${format(start, "HH:mm")} – ${format(end, "HH:mm")}`
        )}
      </div>
      <div className={cn("col-start-9 col-span-3 text-xs pattern-tags-column")}>
        <div className={cn("pb-7", styles.patternTags)}>
          {curator ? (
            <PatternCurator curator={curator} isOpen={isOpen} />
          ) : (
            <PatternTags tags={pattern.tags} isOpen={isOpen} />
          )}
        </div>
      </div>
      <div className={cn("col-start-12 col-span-1 flex justify-end pt-8")}>
        {isOpen ? <X className={styles.iconX} /> : <Plus className={styles.iconPlus} />}
      </div>
    </div>
  )
}

const ScheduleSection = ({ title, text, url, urlText, schedule, type, ...rest }) => {
  const todayDate = new Date()
  const todaySchedule = schedule.find(day => isSameDay(new Date(day.start), todayDate))
  const { items } = useMemo(
    () =>
      todaySchedule.items.reduce(
        ({ passed, items }, item) => {
          return {
            passed: passed + item.duration,
            items: [
              ...items,
              {
                ...item,
                start: addMinutes(new Date(todaySchedule.start), passed * 60),
                end: addMinutes(new Date(todaySchedule.start), (passed + item.duration) * 60),
              },
            ],
          }
        },
        { passed: 0, items: [] }
      ),
    [todaySchedule]
  )
  return todaySchedule ? (
    <section id={type} className="" {...rest}>
      <div>
        {items.map((item, itemIndex) => (
          <ScheduleItem key={itemIndex} {...item} />
        ))}
      </div>
      <div className="bg-grey flex justify-center text-xs-alt">
        <div className="mt-8 mb-18">
          <FormattedMessage id="lastUpdate" />
          {` ${format(new Date(todaySchedule.updatedAt), "dd.MM.yy HH:mm")}`}
        </div>
      </div>
    </section>
  ) : null
}

export default ScheduleSection
