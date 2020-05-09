import React, { useCallback } from "react"
import cn from "classnames"
import UserCount from "@/components/user-count"
import styles from "./index.module.styl"

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
    <button
      className={cn("uppercase text-s mr-20 inline-block", styles.marqueeItem)}
      onClick={handleNavClick}
    >
      {text}
      <sup className="normal-case text-xs">{navText}</sup>
    </button>
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
      <UserCount />
      <MarqueeItems key="first" items={items} className="marquee-box-1" />
      <MarqueeItems key="second" items={items} className="marquee-box-2" />
    </div>
  )
}

export default Marquee
