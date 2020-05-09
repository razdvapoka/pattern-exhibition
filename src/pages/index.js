import { graphql } from "gatsby"
import React, { useState } from "react"

import {
  SECTION_ABOUT,
  SECTION_VIDEO_1,
  SECTION_SCHEDULE,
  SECTION_SUBSCRIBE,
  SECTION_VIDEO_2,
  SECTION_CURATORS,
  SECTION_ROBOT,
  SECTION_GALLERY,
} from "@/consts"
import CuratorsSection from "@/components/curators-section"
import GallerySection from "@/components/gallery-section"
import Layout from "@/components/layout"
import Marquee from "@/components/marquee"
import RobotSection from "@/components/robot-section"
import SEO from "@/components/seo"
import ScheduleSection from "@/components/schedule-section"
import Section from "@/components/section"
import SubscribeSection from "@/components/subscribe-section"
import VideoSection from "@/components/video-section"

import VideoNav from "../components/video-nav"

const getSection = (type, data, setIsVideoNavVisible) => {
  switch (type) {
    case SECTION_ABOUT:
      return {
        component: Section,
      }
    case SECTION_VIDEO_1:
      return {
        component: VideoSection,
        props: {
          setIsVideoNavVisible,
        },
      }
    case SECTION_SCHEDULE:
      return {
        component: ScheduleSection,
        props: {
          schedule: data.schedule,
        },
      }
    case SECTION_SUBSCRIBE:
      return {
        component: SubscribeSection,
      }
    case SECTION_VIDEO_2:
      return {
        component: VideoSection,
        props: {
          setIsVideoNavVisible,
        },
      }
    case SECTION_CURATORS:
      return {
        component: CuratorsSection,
      }
    case SECTION_ROBOT:
      return {
        component: RobotSection,
      }
    case SECTION_GALLERY:
      return {
        component: GallerySection,
      }
    default:
      return "section"
  }
}

const Sections = ({ data, setIsVideoNavVisible }) =>
  data.sections.map((section, sectionIndex) => {
    const { component: SectionComponent, props } = getSection(
      section.type,
      data,
      setIsVideoNavVisible
    )
    return <SectionComponent key={sectionIndex} {...section} {...props} />
  })

const IndexPage = ({ data: { contentfulPage } }) => {
  const [isVideoNavVisible, setIsVideoNavVisible] = useState(true)
  return (
    <Layout>
      <SEO title="Home" />
      <div className="h-screen">Intro </div>
      <VideoNav isVisible={isVideoNavVisible} setIsVideoNavVisible={setIsVideoNavVisible} />
      <Marquee
        items={[
          { text: "Режим работы робота: 24/7", navText: "узнать больше", navHash: "robot" },
          { text: "Режим работы робота: 24/7", navText: "узнать больше", navHash: "robot" },
          { text: "Режим работы робота: 24/7", navText: "узнать больше", navHash: "robot" },
        ]}
      />
      <Sections data={contentfulPage} setIsVideoNavVisible={setIsVideoNavVisible} />
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
      schedule {
        start
        title
        updatedAt
        items {
          buyUrl
          updatedAt
          title
          duration
          id
          pattern {
            id
            externalId
            title
            tags
            isMosaic
            image {
              fluid(maxWidth: 700) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
            thumbnail {
              fixed(width: 200) {
                src
              }
            }
          }
          curator {
            name
            nameInstrumental
            url
            description {
              description
            }
            longDescription {
              longDescription
            }
            audio {
              file {
                url
                fileName
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
