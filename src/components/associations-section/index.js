import React from "react"
import cn from "classnames"

import Markdown from "../markdown"
import styles from "./index.module.styl"

const AssociationsSection = ({ text, subText, associations, type }) => (
  <section className="mt-32 text-blackBg" id={type}>
    <div className={cn("bg-blue text-m-F text-center pt-8 pb-16")}>
      <Markdown className={styles.text}>{text.text}</Markdown>
      <Markdown className="mt-6 text-xs-L uppercase">{subText.subText}</Markdown>
    </div>
    <div className="flex text-m-F uppercase">
      <div className="bg-grey w-1/2 text-center py-8">{associations[0]}</div>
      <div className="bg-purple w-1/2 text-center py-8">{associations[1]}</div>
    </div>
    <div className="flex">
      <div className="pt-5 bg-purple w-1/2 flex justify-cener items-center" />
      <div className="pt-5 bg-grey w-1/2 flex justify-cener items-center" />
    </div>
    <div className="bg-purple pt-5" />
    <div className="flex text-m-F uppercase bg-green">
      <div className="w-1/2 text-center py-8">{associations[2]}</div>
      <div className="w-1/2 text-center py-8">{associations[3]}</div>
    </div>
  </section>
)

export default AssociationsSection
