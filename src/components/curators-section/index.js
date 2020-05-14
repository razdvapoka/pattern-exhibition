import { IntlContextConsumer, FormattedMessage } from "gatsby-plugin-intl"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import React from "react"
import cn from "classnames"

import { blank } from "../../utils"
import Markdown from "../markdown"
import Section from "../section"
import styles from "./index.module.styl"

const Curator = ({ curator, start, end, isInProgress }) => {
  const Component = curator.url ? "a" : "div"
  const props = curator.url ? { href: curator.url, ...blank() } : {}
  return (
    <IntlContextConsumer>
      {({ language }) => (
        <Component className={cn("w-1/4 bg-lightGrey block", styles.curator)} {...props}>
          <div
            className={cn(
              styles.time,
              "flex items-center justify-between pl-2 pr-18 text-xs-F uppercase bg-pale"
            )}
          >
            <div>{format(start, "dd MMMM", language === "ru" ? { locale: ru } : {})}</div>
            <div>
              {format(start, "HH:mm")}-{format(end, "HH:mm")}
            </div>
          </div>
          <div className="pt-10 pl-2 pr-12 pb-3">
            <div className={cn("text-m-F uppercase", styles.name)}>{curator.name}</div>
            <Markdown className={cn("text-xs-F-h overflow-hidden", styles.description)}>
              {curator.description.description}
            </Markdown>
            {curator.url && (
              <div className={cn("text-xs-L uppercase mt-6", styles.more)}>
                <FormattedMessage id="curatorMore" />
              </div>
            )}
          </div>
        </Component>
      )}
    </IntlContextConsumer>
  )
}

const CuratorsSection = ({ curatorDays, ...rest }) => {
  return (
    <Section className="mt-40" {...rest}>
      <div className="flex flex-wrap mt-12">
        {[...curatorDays, ...curatorDays].map((curatorDay, curatorIndex) => (
          <Curator key={curatorIndex} {...curatorDay} />
        ))}
      </div>
    </Section>
  )
}

export default CuratorsSection
