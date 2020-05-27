import React, { useEffect, useRef } from "react"
import { arrayShuffle } from "@adriantombu/array-shuffle"
import cn from "classnames"
import { useMeasure } from "react-use"

import { Noise } from "noisejs"

import Authors from "../authors"
import Markdown from "../markdown"
import styles from "./index.module.styl"
import { ROW_COUNT, COLUMN_COLORS, SEPARATORS } from "./consts"

import { sequence, tail, sum } from "@/utils"

let rafHandle
let separators = [
  [...arrayShuffle(SEPARATORS)],
  [...arrayShuffle(SEPARATORS)],
  [...arrayShuffle(SEPARATORS)],
]
let colors = [[...COLUMN_COLORS], [...COLUMN_COLORS], [...COLUMN_COLORS]]
let shuffledColors = colors.map(arrayShuffle)
let canvas
let canvasContext
const noises = sequence(ROW_COUNT).map(_ => new Noise(Math.random()))
const noises2 = sequence(ROW_COUNT).map((_, i) => separators[i].map(_ => new Noise(Math.random())))
let hoveredRowIndex

const mainNoise = new Noise(Math.random())

const handleMouseMove = e => {}

const handleClick = () => {
  if (rafHandle) {
    cancelAnimationFrame(rafHandle)
    rafHandle = null
  } else {
    rafHandle = requestAnimationFrame(animate)
  }
}

const drawScene = time => {
  if (canvasContext) {
    const w = canvasContext.canvas.width
    const h = canvasContext.canvas.height

    const noiseLevel = (mainNoise.simplex2(time / 5000, 0) + 1) / 2

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
      cols.rects.forEach((rect, rectIndex) => {
        canvasContext.fillStyle = rect.color
        const rectSections = Math.round(noiseLevel * 7 * (i + 1))
        canvasContext.fillRect(rect.x, rect.y, rect.width, rect.height)
        sequence(rectSections).forEach((s, si) => {
          canvasContext.fillStyle = shuffledColors[i][si % shuffledColors[i].length]
          canvasContext.fillRect(
            rect.x + (s * rect.width) / rectSections,
            rect.y,
            rect.width / rectSections,
            rect.height
          )
        })
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
        //return s + ((noises2[i][j].simplex2(time / 1000, 0) + 1) / 2) * (0.005 - i * 0.001)
        return s + noises2[i][j].simplex2(time / 1000, 0) * 0.005 // - i * 0.001)
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
  drawScene(time)
  rafHandle = requestAnimationFrame(animate)
}

export const Canvas = () => {
  const canvasRef = useRef(null)
  const [ref, { width, height }] = useMeasure()

  useEffect(() => {
    if (canvas) {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      // drawScene()
      if (!rafHandle) {
        rafHandle = requestAnimationFrame(animate)
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
        className="bg-black absolute left-0 top-0 w-full h-full"
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
