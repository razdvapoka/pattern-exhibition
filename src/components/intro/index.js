import { FormattedMessage } from "gatsby-plugin-intl"
import React from "react"
import cn from "classnames"

import canvaPlaceholderImage from "@/images/canvas-placeholder.jpg"

import Authors from "../authors"
import Markdown from "../markdown"
import styles from "./index.module.styl"

const CanvasPlaceholder = props => {
  return (
    <div
      style={{
        backgroundImage: `url(${canvaPlaceholderImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      {...props}
    />
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
          <div className="w-1/2 flex flex-col">
            <CanvasPlaceholder className="flex-1" />
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
