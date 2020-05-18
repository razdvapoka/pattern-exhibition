import { FacebookShareButton, TwitterShareButton } from "react-share"
import { FormattedMessage, IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"
import PropTypes from "prop-types"
import React from "react"
import cn from "classnames"

import UserCount from "@/components/user-count"

import { FACEBOOK_URL, INSTAGRAM_URL, ROUND_TABLE_URL } from "../../consts"
import { blank } from "../../utils"
import ClientOnly from "../client-only"
import LangSwitcher from "../lang-switcher"
import styles from "./index.module.styl"

const ShareButtons = () => (
  <>
    <FacebookShareButton className="uppercase" url={document.location.href}>
      fb
    </FacebookShareButton>
    <TwitterShareButton className="uppercase ml-1" url={document.location.href}>
      tw
    </TwitterShareButton>
  </>
)

const Header = ({ siteTitle, toggleMenu }) => (
  <header
    className={cn("px-4 sm:px-2 fixed top-0 left-0 w-screen my-grid bg-white z-50", styles.header)}
  >
    <div className="col-start-1 col-span-6 flex">
      <div className={cn("mr-2 uppercase sm:mr-7", styles.logo)}>
        <span className="text-s-L">Орнамика</span>&nbsp;&nbsp;
        <span className={cn("text-s-F inline-block relative", styles.live)}>live</span>
      </div>
      <UserCount />
    </div>
    <div className="col-start-7 col-span-6 sm:col-span-2 flex justify-between sm:justify-end items-center text-xs-L uppercase">
      <LangSwitcher className="sm:hidden" />
      <div className={cn("uppercase relative sm:hidden", styles.share)}>
        <div
          className={cn(
            "opacity-0 flex justify-center absolute left-0 top-0 w-full h-full bg-white",
            styles.shareButtons
          )}
        >
          <ClientOnly>
            <ShareButtons />
          </ClientOnly>
        </div>
        <FormattedMessage id="share" />
      </div>
      <a href={ROUND_TABLE_URL} {...blank()} className="uppercase sm:hidden">
        <FormattedMessage id="roundTable" />
      </a>
      <a href={FACEBOOK_URL} {...blank()} className="uppercase sm:hidden">
        FB
      </a>
      <a href={INSTAGRAM_URL} {...blank()} className="uppercase sm:hidden">
        INST
      </a>
      <button className={cn("uppercase sm:h-full sm:px-4", styles.menuButton)} onClick={toggleMenu}>
        <FormattedMessage id="menu" />
      </button>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
