import { IntlContextConsumer, FormattedMessage } from "gatsby-plugin-intl"
import React, { useState } from "react"
import cn from "classnames"

import Markdown from "@/components/markdown"

import styles from "./index.module.styl"

const Section = ({
  children,
  title,
  text: { text },
  subText,
  cutText,
  hasSeparator,
  className,
  type,
  isInFooter,
}) => {
  const [isCutTextOpen, setIsCutTextOpen] = useState(false)
  return (
    <section className={cn("px-4 sm:px-2", styles.section, className)}>
      <div id={type} className={styles.anchor} />
      <div className="my-grid">
        <div className="col-start-2 sm:col-start-1 col-span-5 sm:col-span-8 relative sm:text-center">
          <h2 className="text-xl-L uppercase">{title}</h2>
          {subText && (
            <div className={cn("mt-8 sm:mt-4 uppercase text-xs-L", styles.subText)}>
              <Markdown>{subText.subText}</Markdown>
            </div>
          )}
          {hasSeparator && (
            <div className={cn(styles.separator, "absolute h-full top-0 right-0 sm:hidden")}>
              <div className="bg-green" />
              <div className="bg-lightGrey" />
            </div>
          )}
        </div>
        <div
          className="col-start-7 sm:col-start-1 col-span-5 sm:col-span-8 text-m-F sm:mt-8"
          style={{ hyphens: "auto" }}
        >
          <IntlContextConsumer>
            {({ language }) => (
              <div className={styles.sectionText} lang={language}>
                <Markdown>{text}</Markdown>
                {cutText && !isCutTextOpen && (
                  <button
                    className="text-m-L hover:underline"
                    onClick={() => setIsCutTextOpen(true)}
                  >
                    <FormattedMessage id="readMore" />
                  </button>
                )}
                {cutText && isCutTextOpen && (
                  <Markdown className={styles.cutText}>{cutText.cutText}</Markdown>
                )}
              </div>
            )}
          </IntlContextConsumer>
        </div>
      </div>
      {children}
    </section>
  )
}

export default Section
