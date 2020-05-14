import "@/styles/tailwind.styl"
import "defaults.css"
import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "@/components/header"
import "./index.styl"

const Layout = ({ isMenuOpen, toggleMenu, children }) => {
  useEffect(() => {
    require("smoothscroll-polyfill").polyfill()
  }, [])
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="text-m">
      <Header
        siteTitle={data.site.siteMetadata.title}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />
      <main>{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
