import React from "react"
import { graphql } from "gatsby"

import Layout from "@/components/layout"
import Image from "@/components/image"
import SEO from "@/components/seo"

import { useIntl, Link, FormattedMessage } from "gatsby-plugin-intl"

const IndexPage = ({ data }) => {
  const intl = useIntl()
  return (
    <Layout>
      <SEO title="Home" />
      <h1>{intl.formatMessage({ id: "test" })}</h1>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </Layout>
  )
}

export const query = graphql`
  query ContentfulTextBlocks($locale: String) {
    allContentfulTextBlock(filter: { node_locale: { eq: $locale } }) {
      nodes {
        title
        content {
          content
        }
      }
    }
  }
`

export default IndexPage
