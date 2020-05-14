import Img from "gatsby-image"
import React, { useMemo } from "react"
import cn from "classnames"

import { blank } from "../../utils"
import Section from "../section"

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  )

const GalleryItem = ({ buyUrl, title, externalId, thumbnail, className }) => (
  <a href={buyUrl} {...blank()} className={cn(className, "block")}>
    <Img fluid={thumbnail.fluid} />
    <div className="mt-1 flex justify-between">
      <div className="w-1/4 mr-4 text-xs-L">{`#${externalId}`}</div>
      <div className="truncate text-xs-F uppercase">{title}</div>
    </div>
  </a>
)

const GallerySection = ({ items, ...rest }) => {
  const rows = useMemo(() => chunk(items, 3), [items])
  return (
    <Section className="mt-40" {...rest}>
      <div className="mt-24">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="my-grid mb-24">
            {row.map((item, itemIndex) => (
              <GalleryItem
                className={`col-start-${1 + itemIndex * 4} col-span-4`}
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
