import React from "react"
import { graphql } from "gatsby"

import Layout from "@/components/layout"
import SEO from "@/components/seo"
import Section from "@/components/section"
import { SECTION_ABOUT } from "@/consts"

const Sections = ({ sections }) => {
  return (
    <>
      {sections.map((section, sectionIndex) => {
        switch (section.type) {
          case SECTION_ABOUT:
            return <Section key={sectionIndex} {...section} />
          default:
            return <div key={sectionIndex} />
        }
      })}
    </>
  )
}

const IndexPage = ({
  data: {
    contentfulPage: { sections },
  },
}) => {
  return (
    <Layout>
      <SEO title="Home" />
      <Sections sections={sections} />
    </Layout>
  )
}

export const query = graphql`
  query MainPage($locale: String) {
    contentfulPage(title: { eq: "main" }, node_locale: { eq: $locale }) {
      title
      sections {
        title
        text {
          text
        }
        url
        urlText
        type
      }
    }
  }
`

export default IndexPage
