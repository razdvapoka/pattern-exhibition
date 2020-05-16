import Img from "gatsby-image"
import React, { useMemo } from "react"
import cn from "classnames"

import { blank } from "../../utils"
import Section from "../section"
import styles from "./index.module.styl"

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  )

const GalleryItem = ({ buyUrl, title, externalId, thumbnail, className, small }) => (
  <a href={buyUrl} {...blank()} className={cn(className, "block")}>
    <Img fluid={thumbnail.fluid} />
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
    </Section>
  )
}

export default GallerySection
