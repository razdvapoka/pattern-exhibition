import PropTypes from "prop-types"
import React from "react"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"

const Header = ({ siteTitle }) => (
  <header className={"px-4"}>
    <div>
      <IntlContextConsumer>
        {({ languages, language: currentLocale }) =>
          languages.map(language => (
            <button
              key={language}
              onClick={() => changeLocale(language)}
              style={{
                color: currentLocale === language ? `red` : `black`,
              }}
            >
              {language}
            </button>
          ))
        }
      </IntlContextConsumer>
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
