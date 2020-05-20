import { FormattedMessage } from "gatsby-plugin-intl"
import Img from "gatsby-image"
import React, { useMemo } from "react"
import cn from "classnames"

import { ALI_EXPRESS_URL } from "../../consts"
import { blank } from "../../utils"
import Section from "../section"
import styles from "./index.module.styl"

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  )

const GalleryItem = ({ buyUrl, title, externalId, image, className, small }) => (
  <a href={buyUrl} {...blank()} className={cn(className, "block")}>
    <Img fluid={image.fluid} />
    <div className={cn("mt-1 flex justify-between", { "sm:flex-col items-center": small })}>
      <div className="w-1/4 mr-4 text-xs-L">{`#${externalId}`}</div>
      <div
        className={cn("truncate text-xs-F uppercase", {
          "sm:break-normal sm:whitespace-normal sm:text-center": small,
          [styles.clamp]: small,
        })}
      >
        {title}
      </div>
    </div>
  </a>
)

const GallerySection = ({ items, ...rest }) => {
  const rows = useMemo(() => chunk(items, 3), [items])
  return (
    <Section className="mt-40 sm:mt-24" {...rest}>
      <div className="mt-24 sm:mt-8">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="my-grid mb-24 sm:mb-6">
            {row.map((item, itemIndex) => (
              <GalleryItem
                className={`
                  col-start-${1 + itemIndex * 4}
                  col-span-4
                  sm:col-start-${(itemIndex - 1) % 3 === 0 ? "5" : "1"}
                  sm:col-span-${(itemIndex + 1) % 3 === 0 ? "8" : "4"}
                  sm:mt-${(itemIndex + 1) % 3 === 0 ? "6" : "0"}
                `}
                small={(itemIndex + 1) % 3 !== 0}
                key={itemIndex}
                {...item}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={cn("my-grid sm:justify-center sm:pt-4", styles.buyPosterBox)}>
        <a
          href={ALI_EXPRESS_URL}
          {...blank()}
          className={cn(
            "text-center col-start-5 col-span-4 text-m-L-c py-4 sm:px-7 bg-yellow uppercase",
            styles.buyPoster
          )}
        >
          <FormattedMessage id="buyPoster" />
          <span className="text-m-A-c"> ↗</span>
        </a>
      </div>
    </Section>
  )
}

export default GallerySection
