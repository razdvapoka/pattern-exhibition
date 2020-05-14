import { FacebookShareButton, TwitterShareButton } from "react-share"
import { FormattedMessage, IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"
import PropTypes from "prop-types"
import React from "react"
import cn from "classnames"

import UserCount from "@/components/user-count"

import { FACEBOOK_URL, INSTAGRAM_URL, ROUND_TABLE_URL } from "../../consts"
import { blank } from "../../utils"
import ClientOnly from "../client-only"
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
  <header className={cn("px-4 fixed top-0 left-0 w-screen my-grid bg-white z-50", styles.header)}>
    <div className="col-start-1 col-span-6 flex">
      <div className={cn("mr-2 uppercase", styles.logo)}>
        <span className="text-s-L">Орнамика</span>&nbsp;&nbsp;
        <span className={cn("text-s-F inline-block relative", styles.live)}>live</span>
      </div>
      <UserCount />
    </div>
    <div className="col-start-7 col-span-6 flex justify-between items-center text-xs-L uppercase">
      <div>
        <IntlContextConsumer>
          {({ languages, language: currentLocale }) =>
            languages.map(language => (
              <button
                className={cn("uppercase mr-1", {
                  "underline pointer-events-none": currentLocale === language,
                })}
                key={language}
                onClick={() => changeLocale(language)}
              >
                {language}
              </button>
            ))
          }
        </IntlContextConsumer>
      </div>
      <div className={cn("uppercase relative", styles.share)}>
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
      <a href={ROUND_TABLE_URL} {...blank()} className="uppercase">
        <FormattedMessage id="roundTable" />
      </a>
      <a href={FACEBOOK_URL} {...blank()} className="uppercase">
        FB
      </a>
      <a href={INSTAGRAM_URL} {...blank()} className="uppercase">
        INST
      </a>
      <button className="uppercase" onClick={toggleMenu}>
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
