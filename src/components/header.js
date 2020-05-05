import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <div>
        <IntlContextConsumer>
          {({ languages, language: currentLocale }) =>
            languages.map(language => (
              <a
                key={language}
                onClick={() => changeLocale(language)}
                style={{
                  color: currentLocale === language ? `yellow` : `white`,
                  margin: 10,
                  textDecoration: `underline`,
                  cursor: `pointer`,
                }}
              >
                {language}
              </a>
            ))
          }
        </IntlContextConsumer>
      </div>
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
