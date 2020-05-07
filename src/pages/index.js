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

const getSectionComponent = type => {
  switch (type) {
    case SECTION_ABOUT:
      return Section
    case SECTION_VIDEO_1:
      return VideoSection
    case SECTION_SCHEDULE:
      return ScheduleSection
    case SECTION_SUBSCRIBE:
      return SubscribeSection
    case SECTION_VIDEO_2:
      return VideoSection
    case SECTION_CURATORS:
      return CuratorsSection
    case SECTION_ROBOT:
      return RobotSection
    case SECTION_GALLERY:
      return GallerySection
    default:
      return "section"
  }
}

const Sections = ({ sections, setIsVideoNavVisible }) =>
  sections.map((section, sectionIndex) => {
    const SectionComponent = getSectionComponent(section.type)
    return (
      <SectionComponent
        key={sectionIndex}
        setIsVideoNavVisible={setIsVideoNavVisible}
        {...section}
      />
    )
  })

const IndexPage = ({
  data: {
    contentfulPage: { sections },
  },
}) => {
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
      <Sections sections={sections} setIsVideoNavVisible={setIsVideoNavVisible} />
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
