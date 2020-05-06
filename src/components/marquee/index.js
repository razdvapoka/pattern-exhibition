import React, { useCallback } from "react"
import cn from "classnames"
import styles from "./index.module.styl"
import Eye from "@/icons/eye.inline.svg"

const MarqueeItem = ({ navHash, text, navText }) => {
  const handleNavClick = useCallback(() => {
    const el = document.querySelector(`#${navHash}`)
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      })
    }
  }, [navHash])
  return (
    <span className={cn("uppercase text-s mr-20 inline-block", styles.marqueeItem)}>
      {text}
      <sup className="normal-case text-xs">
        <button onClick={handleNavClick}>{navText}</button>
      </sup>
    </span>
  )
}

const MarqueeItems = ({ items, className }) => (
  <div className={cn("inline-block absolute left-0", styles.marqueeItems, className)}>
    {items.map((item, itemIndex) => (
      <MarqueeItem key={itemIndex} {...item} />
    ))}
  </div>
)

const Marquee = ({ items }) => {
  const views = 100
  return (
    <div
      className={cn(
        `
      overflow-hidden
      w-screen
      whitespace-no-wrap
      bg-yellow
      text-black
      py-1
      relative
    `,
        styles.marquee
      )}
    >
      <div
        className={`
        flex items-center justify-center
        absolute left-0 top-0
        h-full
        bg-white text-pureBlack
        text-s-alt
        z-10
        px-5
        `}
      >
        <Eye className={styles.eye} />
        {views}
      </div>
      <MarqueeItems key="first" items={items} className="marquee-box-1" />
      <MarqueeItems key="second" items={items} className="marquee-box-2" />
    </div>
  )
}

export default Marquee
