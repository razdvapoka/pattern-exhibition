import React from "react"
import Markdown from "@/components/markdown"
import cn from "classnames"
import styles from "./index.module.styl"
import { blank } from "@/utils"

const Section = ({ children, title, text: { text }, subText, hasSeparator, className, type }) => (
  <section className={cn("px-4", className)} id={type}>
    <div className="my-grid">
      <div className="col-start-2 col-span-5 relative">
        <h2 className="text-xl-L uppercase">{title}</h2>
        {subText && (
          <div className={cn("mt-8 uppercase text-xs-L", styles.subText)}>
            <Markdown>{subText.subText}</Markdown>
          </div>
        )}
        {hasSeparator && (
          <div className={cn(styles.separator, "absolute h-full top-0 right-0")}>
            <div className="bg-green" />
            <div className="bg-lightGrey" />
          </div>
        )}
      </div>
      <div className="col-start-7 col-span-5 text-m-F">
        <div className={styles.sectionText}>
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
    {children}
  </section>
)

export default Section
