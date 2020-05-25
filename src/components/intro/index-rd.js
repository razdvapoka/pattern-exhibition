import { Noise } from "noisejs"
import { arrayShuffle } from "@adriantombu/array-shuffle"
import { useMeasure } from "react-use"
import React, { useEffect, useRef } from "react"
import anime from "animejs"
import cn from "classnames"

import { sequence, tail, sum } from "@/utils"

import { ROW_COUNT, COLUMN_COLORS, SEPARATORS } from "./consts"
import { randomItem } from "../../utils"
import Authors from "../authors"
import Markdown from "../markdown"
import styles from "./index.module.styl"

let rafHandle
let canvas
let canvasContext
let hoveredRowIndex
let timeline

const DURATION = 1500
const PLANE_COUNT = 20
const RECT_COUNT = 7
const RECT_WIDTHS = [384, 384, 515, 257, 128, 130, 122].map(x => x / 1920)

const arrWithout = (arr, el) => {
  const index = arr.indexOf(el)
  if (index === -1) {
    return arr
  }
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

let colors = [...COLUMN_COLORS, ...COLUMN_COLORS, ...COLUMN_COLORS, ...COLUMN_COLORS]
let bgColor = colors[colors.length - 1]

let planes = sequence(PLANE_COUNT).map(i => ({
  index: i,
  rects: sequence(RECT_COUNT).map((j, ji) => ({
    x: sum(RECT_WIDTHS.slice(0, ji)),
    width: RECT_WIDTHS[ji],
    height: 0,
    color: colors[i],
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
    canvasContext.fillStyle = bgColor
    canvasContext.fillRect(0, 0, w, h)
    planes.forEach((plane, pi) => {
      plane.rects.forEach((rect, ri) => {
        if (pi === 0 && ri === 0) {
          //console.log(rect.height)
        }
        canvasContext.fillStyle = rect.color
        canvasContext.fillRect(
          Math.floor(rect.x * w),
          h - rect.height * h,
          Math.ceil(rect.width * w + 1),
          rect.height * h
        )
        /*
      canvasContext.strokeStyle = "black"
      canvasContext.strokeRect(rect.x * w, h - rect.height * h, rect.width * w, rect.height * w)
      */
      })
    })
  }
}

const animatePlane = (plane, planeIndex) => {
  let b
  return {
    targets: plane.rects,
    height: 1,
    duration: DURATION,
    //delay: anime.stagger(400),
    delay: anime.stagger(400, {
      easing: "easeInCirc", //randomItem(["easeInQuad", "easeInCubic"]),
      //easing: "easeInQuad", //randomItem(["easeInQuad", "easeInCubic"]),
    }),
  }
}

const animatePlanes = () => {
  const animations = planes.map(animatePlane)
  timeline = anime.timeline({
    easing: "easeInOutCubic",
    update: drawScene,
    loop: true,
    loopBegin: function (anim) {
      bgColor = colors[colors.length - 1]
      colors = arrayShuffle(colors)
      planes.forEach((plane, planeIndex) => {
        return plane.rects.forEach(rect => {
          rect.height = 0
          rect.color = colors[planeIndex]
        })
      })
    },
  })
  animations.forEach((a, i) =>
    // timeline.add(a, i !== 0 ? `-=${DURATION + 350 + Math.random() * 100 * 2}` : undefined)
    //timeline.add(a, i !== 0 ? `-=${3600 + (Math.random() * 700 - 350)}` : undefined)
    timeline.add(a, i !== 0 ? `-=${3700}` : undefined)
  )
  timeline.play()
}

export const Canvas = () => {
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

const Intro = ({ title, secondTitle, liveText, description: { description } }) => {
  return (
    <section className="w-screen" style={{ height: "50vh" }}>
      <div className="w-1/2 h-full">
        <Canvas />
      </div>
    </section>
  )
}

export default Intro
