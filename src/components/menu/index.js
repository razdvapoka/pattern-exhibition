import { FormattedMessage } from "gatsby-plugin-intl"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import React, { useRef, useEffect } from "react"
import cn from "classnames"

import X from "@/icons/x.inline.svg"

import {
  BUY_PATTERN_URL,
  EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  ROUND_TABLE_URL,
  SECTION_ROUND_TABLE,
  SURVEY_URL,
} from "../../consts"
import { blank } from "../../utils"
import styles from "./index.module.styl"

const Menu = ({ sections, toggleMenu, scrollLock = true, isMenuOpen }) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (el && scrollLock) {
      if (isMenuOpen) {
        disableBodyScroll(ref.current)
      } else {
        enableBodyScroll(ref.current)
      }
    }
  }, [isMenuOpen, ref])

  return (
    <div
      ref={ref}
      className={cn(
        "bg-grey text-center h-screen z-50 fixed right-0 top-0 overflow-auto",
        styles.menuBox,
        isMenuOpen ? styles.menuOpen : styles.menuClosed
      )}
    >
      <div className={cn("px-4", styles.menu)}>
        <div className={cn("flex justify-between items-center text-xs-L uppercase", styles.top)}>
          <div>
            <FormattedMessage id="menu" />
          </div>
          <button onClick={toggleMenu} className="flex uppercase">
            <FormattedMessage id="close" />
            <X className={cn("ml-1", styles.close)} />
          </button>
        </div>
        <ul className="text-xl-L-c uppercase mt-16">
          {sections
            .filter(s => s.isInFooter || s.type === SECTION_ROUND_TABLE)
            .map((section, sectionIndex) => (
              <li key={sectionIndex} className="mb-4 hover:text-plum">
                <a href={`#${section.type}`} onClick={toggleMenu}>
                  {section.title}
                </a>
              </li>
            ))}
        </ul>
        <ul className="mt-12 text-m-L-cc uppercase">
          <li>
            <a href={BUY_PATTERN_URL} {...blank()}>
              <FormattedMessage id="buyPattern" />
              <span className="text-m-A-cc"> ↗</span>
            </a>
          </li>
          <li className="mt-4">
            <a href={ROUND_TABLE_URL} {...blank()}>
              <FormattedMessage id="roundTableSignUp" />
              <span className="text-m-A-cc"> ↗</span>
            </a>
          </li>
          <li className="mt-4">
            <a href={SURVEY_URL} {...blank()}>
              <FormattedMessage id="survey" />
              <span className="text-m-A-cc"> ↗</span>
            </a>
          </li>
        </ul>
        <div className="mt-16 flex justify-center text-xs-L uppercase">
          <a href={FACEBOOK_URL} {...blank()}>
            facebook
          </a>
          <a className="ml-8" href={INSTAGRAM_URL} {...blank()}>
            instagram
          </a>
          <a className="ml-8" href={EMAIL} {...blank()}>
            email
          </a>
        </div>
      </div>
    </div>
  )
}

export default Menu
