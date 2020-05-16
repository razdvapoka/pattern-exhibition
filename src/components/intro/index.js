import React, { useEffect, useRef } from "react"
import cn from "classnames"
import { useMeasure } from "react-use"

import { Noise } from "noisejs"

import Authors from "../authors"
import Markdown from "../markdown"
import styles from "./index.module.styl"
import { ROW_COUNT, COLUMN_COLORS, SEPARATORS } from "./consts"

const sequence = length => Array.from(Array(length).keys())
const tail = arr => arr[arr.length - 1]
const sum = arr => arr.reduce((s, i) => s + i, 0)

let rafHandle
let separators = [[...SEPARATORS], [...SEPARATORS], [...SEPARATORS]]
let colors = [[...COLUMN_COLORS], [...COLUMN_COLORS], [...COLUMN_COLORS]]
let canvas
let canvasContext
const noises = sequence(ROW_COUNT).map(_ => new Noise(Math.random()))
const noises2 = sequence(ROW_COUNT).map((_, i) => separators[i].map(_ => new Noise(Math.random())))
let hoveredRowIndex

const handleMouseMove = e => {}

const handleClick = () => {
  if (rafHandle) {
    cancelAnimationFrame(rafHandle)
    rafHandle = null
  } else {
    rafHandle = requestAnimationFrame(animate)
  }
}

const drawScene = () => {
  if (canvasContext) {
    const w = canvasContext.canvas.width
    const h = canvasContext.canvas.height

    for (let i = 0; i < ROW_COUNT; i++) {
      const rowSeps = separators[i]
      const lastColFr = 1 - rowSeps.reduce((s, i) => s + i, 0)
      const cols = colors[i].reduce(
        ({ rects, offset }, color, colorIndex) => {
          const rect = {
            x: Math.floor(offset),
            y: Math.floor((i / ROW_COUNT) * h),
            width: Math.ceil(w * (rowSeps[colorIndex] || lastColFr)),
            height: Math.ceil(h / ROW_COUNT),
            color,
          }
          return {
            rects: [...rects, rect],
            offset: offset + w * rowSeps[colorIndex],
          }
        },
        { rects: [], offset: 0 }
      )
      cols.rects.forEach(rect => {
        canvasContext.fillStyle = rect.color
        canvasContext.fillRect(rect.x, rect.y, rect.width, rect.height)
      })
    }
  }
}

const animate = time => {
  // noises.forEach((noise, i) => {
  //   const n = noise.simplex2(time / 1000, 0) * 0.003
  //   separators[i] = separators[i].map(s => s + n)
  // })

  separators = separators
    .map((sr, i) => {
      return sr.map((s, j) => {
        return s + ((noises2[i][j].simplex2(time / 1000, 0) + 1) / 2) * (0.005 - i * 0.001)
      })
    })
    .map((sr, i) => {
      const rowSum = sum(sr)
      const isOverflown = rowSum > 1
      const nsr = isOverflown ? [rowSum - 1, ...sr.slice(0, sr.length - 1)] : sr
      if (isOverflown) {
        colors[i] = [tail(colors[i]), ...colors[i].slice(0, colors[i].length - 1)]
      }
      return nsr
    })

  /*
  noises2.forEach((ns, i) => {
    ns.forEach((n, j) => {
      let x = separators[i][j] + ((n.simplex2(time / 1000, 0) + 1) / 2) * 0.005
      if (i === 0) {
        console.log(i, j, x)
      }
      if (x > 1) {
        const oldColors = colors[i]
        colors[i] = [tail(oldColors), ...oldColors.slice(0, oldColors.length - 2)]
      }
      separators[i][j] = x % 1
    })
  })
  */
  drawScene()
  rafHandle = requestAnimationFrame(animate)
}

const Canvas = () => {
  const canvasRef = useRef(null)
  const [ref, { width, height }] = useMeasure()

  useEffect(() => {
    if (canvas) {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      drawScene()
      /*
      if (!rafHandle) {
        rafHandle = requestAnimationFrame(animate)
      }
      */
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
        className="bg-black absolute left-0 top-0 w-full h-full"
        ref={canvasRef}
        onClick={handleClick}
      />
    </div>
  )
}

const Intro = ({ title, liveText, description: { description } }) => {
  return (
    <section className="">
      <div className={cn("flex flex-col pt-10 h-screen pb-6", styles.introTop)}>
        <h1 className={cn(styles.logo, "uppercase flex justify-between items-baseline")}>
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
        <div className="flex flex-1 mt-3">
          <div className="w-1/2">
            <Canvas />
          </div>
          <div className="w-1/2 bg-grey p-2 uppercase flex flex-col">
            <div className="text-xs-L">{liveText}</div>
            <div className={cn("text-l-F", styles.title)}>{title}</div>
            <div className={cn("text-xs-L", styles.description)}>
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
