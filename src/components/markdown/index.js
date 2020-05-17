import React from "react"
import ReactMarkdown from "react-markdown"
import styles from "./index.module.styl"
import remarkTypograph from "@mavrin/remark-typograf"
import cn from "classnames"

const isExternal = url => !url.startsWith("#")
const renderers = {
  link: ({ children, title, href, ...rest }) => {
    return (
      <a
        href={title || href}
        target={title ? "" : "_blank"}
        rel={title ? "" : "noopener, noreferrer"}
      >
        {children}
      </a>
    )
  },
  footnoteReference: ({ identifier, ...rest }) => {
    const [text, url] = identifier.split("|")
    return (
      <sup>
        {url ? (
          <a
            href={url}
            target={isExternal(url) ? "_blank" : ""}
            rel={isExternal(url) ? "noopener noreferrer" : ""}
          >
            {text}
          </a>
        ) : (
          text
        )}
      </sup>
    )
  },
}

const Markdown = ({ children, className, ...rest }) => (
  <ReactMarkdown
    className={cn(styles.markdown, className)}
    source={children}
    parserOptions={{ commonmark: true, footnotes: true }}
    renderers={renderers}
    plugins={[remarkTypograph, { locale: ["en-US", "ru-RU"] }]}
    {...rest}
  />
)

export default Markdown
