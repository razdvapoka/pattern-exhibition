import { FormattedMessage } from "gatsby-plugin-intl"
import React from "react"
import cn from "classnames"

import { blank } from "../../utils"
import Markdown from "../markdown"
import styles from "./index.module.styl"

const SubscribeSection = ({ text: { text }, ...rest }) => (
  <section className="mt-22" {...rest}>
    <div className={cn("flex", styles.block)}>
      <div className="w-1/2 flex items-center justify-center bg-yellow text-l-F-c uppercase">
        <FormattedMessage id="leaveEmail" />
      </div>
      <div className="w-1/2 flex items-center justify-center bg-pale">input</div>
    </div>
    <div className="flex items-center justify-center bg-grey py-12 text-center text-m-F">
      <Markdown>{text}</Markdown>
    </div>
    <div className={cn("flex text-m-L-c uppercase", styles.block)}>
      <div className="w-1/2 flex items-center justify-center bg-blue">
        <a {...blank()}>facebook</a>
      </div>
      <div className="w-1/2 flex items-center justify-center bg-purple">
        <a {...blank()}>instagram</a>
      </div>
    </div>
  </section>
)

export default SubscribeSection
