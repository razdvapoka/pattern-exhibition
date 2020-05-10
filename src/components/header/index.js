import PropTypes from "prop-types"
import React from "react"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"
import UserCount from "@/components/user-count"
import styles from "./index.module.styl"
import cn from "classnames"
import { FormattedMessage } from "gatsby-plugin-intl"

const Header = ({ siteTitle }) => (
  <header className="px-4 fixed top-0 left-0 w-screen my-grid bg-white">
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
      <button className="uppercase">
        <FormattedMessage id="share" />
      </button>
      <a className="uppercase">
        <FormattedMessage id="roundTable" />
      </a>
      <a className="uppercase">FB</a>
      <a className="uppercase">INST</a>
      <button className="uppercase">
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
