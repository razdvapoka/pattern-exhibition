import React, { useEffect, useRef } from "react"
import cn from "classnames"
import { useMeasure } from "react-use"
import anime from "animejs"

import { Noise } from "noisejs"

import Authors from "../authors"
import Markdown from "../markdown"
import styles from "./index.module.styl"
import { ROW_COUNT, COLUMN_COLORS, SEPARATORS } from "./consts"

import { sequence, tail, sum } from "@/utils"

let rafHandle
let canvas
let canvasContext
let hoveredRowIndex
let timeline

const PLANE_COUNT = 5
const RECT_COUNT = 5

let planes = sequence(PLANE_COUNT).map(i => ({
  index: i,
  rects: sequence(RECT_COUNT).map(j => ({
    x: 0 + j / RECT_COUNT,
    width: 1 / RECT_COUNT,
    height: 0,
    color: COLUMN_COLORS[i],
  })),
}))

const handleMouseMove = e => {}

const handleClick = () => {
  if (timeline.paused) {
    timeline.play()
  } else {
    timeline.pause()
  }
}

const drawScene = () => {
  if (canvasContext) {
    const w = canvasContext.canvas.width
    const h = canvasContext.canvas.height
    canvasContext.fillStyle = COLUMN_COLORS[COLUMN_COLORS.length - 1]
    canvasContext.fillRect(0, 0, w, h)
    planes.forEach((plane, pi) => {
      plane.rects.forEach((rect, ri) => {
        if (pi === 0 && ri === 0) {
          //console.log(rect.height)
        }
        canvasContext.fillStyle = rect.color
        canvasContext.fillRect(rect.x * w, h - rect.height * h, rect.width * w, rect.height * h)
        /*
      canvasContext.strokeStyle = "black"
      canvasContext.strokeRect(rect.x * w, h - rect.height * h, rect.width * w, rect.height * w)
      */
      })
    })
  }
}

const animatePlane = plane => {
  return {
    targets: plane.rects,
    height: 1,
    duration: 1000,
    delay: anime.stagger(100),
  }
}

const animatePlanes = () => {
  const animations = planes.map(animatePlane)
  timeline = anime.timeline({
    easing: "easeOutQuad",
    update: drawScene,
    loop: true,
    loopBegin: function (anim) {
      planes.forEach(plane =>
        plane.rects.forEach(rect => {
          rect.height = 0
        })
      )
    },
  })
  animations.forEach((a, i) => timeline.add(a, i !== 0 ? "-=990" : undefined))
  timeline.play()
}

const Canvas = () => {
  const canvasRef = useRef(null)
  const [ref, { width, height }] = useMeasure()

  useEffect(() => {
    if (canvas) {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      if (!timeline) {
        animatePlanes()
      }
    }
  }, [width, height])

  // init canvas and scene
  useEffect(() => {
    if (canvasRef.current) {
      canvas = canvasRef.current
      canvasContext = canvasRef.current.getContext("2d")
    }
  }, [canvasRef])

  return (
    <div className="h-full relative" ref={ref}>
      <canvas
        className="bg-white absolute left-0 top-0 w-full h-full"
        ref={canvasRef}
        onClick={handleClick}
      />
    </div>
  )
}

const Logo = ({ className }) => (
  <h1 className={cn(styles.logo, "uppercase flex justify-between items-baseline", className)}>
    <span className="text-xxl-L">
      <span style={{ letterSpacing: "-0.02em" }}>O</span>
      <span style={{ letterSpacing: "0.1em" }}>r</span>
      <span style={{ letterSpacing: "-0.08em" }}>n</span>
      <span style={{ letterSpacing: "0.05em" }}>a</span>
      <span style={{ letterSpacing: "0" }}>m</span>
      <span style={{ letterSpacing: "0" }}>i</span>
      <span style={{ letterSpacing: "0.06em" }}>k</span>
      <span style={{ letterSpacing: "0" }}>a</span>
      &nbsp;&nbsp;
    </span>{" "}
    <span className={cn("text-xxl-F relative", styles.live)}>Live</span>
  </h1>
)

const Intro = ({ title, liveText, description: { description } }) => {
  return (
    <section className="">
      <div
        className={cn(
          "flex flex-col pt-10 sm:pt-6 h-screen sm:h-auto pb-6 sm:pb-0",
          styles.introTop
        )}
      >
        <Logo className="sm:hidden" />
        <div className="flex sm:flex-col flex-1 mt-3 sm:mt-0">
          <div className={cn("w-1/2 sm:w-full", styles.canvasBox)}>
            <Canvas />
          </div>
          <Logo className="hidden sm:flex" />
          <div
            className={cn("w-1/2 sm:w-full bg-grey p-2 uppercase flex flex-col", styles.introInfo)}
          >
            <div className="text-xs-L">{liveText}</div>
            <div className={cn("text-l-F", styles.title)}>{title}</div>
            <div className={cn("text-xs-L sm:w-3/4", styles.description)}>
              <Markdown>{description}</Markdown>
            </div>
          </div>
        </div>
      </div>
      <Authors className={styles.introBottom} />
    </section>
  )
}

export default Intro
