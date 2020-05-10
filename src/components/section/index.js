import React from "react"
import Markdown from "@/components/markdown"
import cn from "classnames"
import styles from "./index.module.styl"
import { blank } from "@/utils"

const Section = ({ children, title, text: { text }, url, urlText, hasSeparator }) => (
  <section className="px-4">
    <div className={cn("grid grid-cols-12", styles.about)}>
      <div className="col-start-2 col-span-5 relative">
        <h2 className="text-xl uppercase">{title}</h2>
        {url && (
          <a href={url} className="block mt-14 text-m-alt" {...blank()}>
            {urlText || url}
          </a>
        )}
        {hasSeparator && (
          <div className={cn(styles.separator, "absolute h-full top-0 right-0")}>
            <div className="bg-green" />
            <div className="bg-lightGrey" />
          </div>
        )}
      </div>
      <div className="col-start-7 col-span-5">
        <div className={styles.sectionText}>
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
    {children}
  </section>
)

export default Section
