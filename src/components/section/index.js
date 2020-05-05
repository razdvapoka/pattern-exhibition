import React from "react"
import Markdown from "@/components/markdown"
import cn from "classnames"
import styles from "./index.module.styl"

const Section = ({ children, title, text: { text }, url, urlText }) => (
  <section className="px-4">
    <div className="flex justify-between">
      <div className="flex-1 pl-10">
        <h2 className="text-xl uppercase">{title}</h2>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-14 underline text-m-alt"
          >
            {urlText || url}
          </a>
        )}
      </div>
      <div className="flex-1 ml-4">
        <div className={cn("w-5/6", styles.sectionText)}>
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
    {children}
  </section>
)

export default Section
