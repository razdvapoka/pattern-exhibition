import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"
import React from "react"
import cn from "classnames"

const LangSwitcher = props => (
  <div {...props}>
    <IntlContextConsumer>
      {({ languages, language: currentLocale }) =>
        languages.map(language => (
          <button
            className={cn("uppercase mr-1 sm:pt-1", {
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
)

export default LangSwitcher
