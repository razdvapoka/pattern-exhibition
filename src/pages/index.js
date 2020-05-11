import { graphql } from "gatsby"
import React, { useMemo, useState } from "react"
import { isSameDay, addMinutes, isWithinInterval } from "date-fns"

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
import Intro from "@/components/intro"
import SubscribeSection from "@/components/subscribe-section"
import VideoSection from "@/components/video-section"

import VideoNav from "../components/video-nav"

const getSection = (type, { data, setIsVideoNavVisible, schedule, curatorDays }) => {
  switch (type) {
    case SECTION_ABOUT:
      return {
        component: Section,
        props: {
          hasSeparator: true,
          className: "mt-24",
        },
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
          schedule,
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
        props: {
          curatorDays,
        },
      }
    case SECTION_ROBOT:
      return {
        component: RobotSection,
        props: {
          images: data.robotImages,
        },
      }
    case SECTION_GALLERY:
      return {
        component: GallerySection,
      }
    default:
      return "section"
  }
}

const Sections = ({ data, setIsVideoNavVisible, schedule, curatorDays }) =>
  data.sections.map((section, sectionIndex) => {
    const { component: SectionComponent, props } = getSection(section.type, {
      data,
      setIsVideoNavVisible,
      schedule,
      curatorDays,
    })
    return <SectionComponent key={sectionIndex} {...section} {...props} />
  })

const IndexPage = ({ data: { contentfulPage, allContentfulCurator } }) => {
  const [isVideoNavVisible, setIsVideoNavVisible] = useState(true)

  const fullSchedule = useMemo(
    () =>
      contentfulPage.schedule.map(day => ({
        ...day,
        items: day.items.reduce(
          ({ passed, items }, item) => {
            const start = addMinutes(new Date(day.start), passed * 60)
            const end = addMinutes(new Date(day.start), (passed + item.duration) * 60)
            const isInProgress = isWithinInterval(new Date(), { start, end })

            return {
              passed: passed + item.duration,
              items: [
                ...items,
                {
                  ...item,
                  start,
                  end,
                  isInProgress,
                },
              ],
            }
          },
          { passed: 0, items: [] }
        ).items,
      })),
    [contentfulPage]
  )

  const todaySchedule = useMemo(
    () =>
      fullSchedule.find(day => {
        return isSameDay(new Date(day.start), new Date())
      }),
    [fullSchedule]
  )

  const currentPattern = useMemo(() => todaySchedule.items.find(item => item.isInProgress), [
    todaySchedule,
  ])

  const curatorDays = useMemo(
    () =>
      fullSchedule.reduce((agg, day) => {
        return [...agg, ...day.items.filter(item => item.curator)]
      }, []),
    [fullSchedule]
  )

  return (
    <Layout>
      <SEO title="Home" />
      <Intro {...contentfulPage.intro} />
      <VideoNav isVisible={isVideoNavVisible} setIsVideoNavVisible={setIsVideoNavVisible} />
      <Marquee
        items={[
          { text: "Режим работы робота: 24/7", navText: "узнать больше", navHash: "schedule" },
          { text: "Режим работы робота: 24/7", navText: "узнать больше", navHash: "schedule" },
          { text: "Режим работы робота: 24/7", navText: "узнать больше", navHash: "schedule" },
        ]}
      />
      <Sections
        data={contentfulPage}
        schedule={{ items: todaySchedule.items, lastUpdate: todaySchedule.updatedAt }}
        curatorDays={curatorDays}
        setIsVideoNavVisible={setIsVideoNavVisible}
      />
    </Layout>
  )
}

export const query = graphql`
  query MainPage($locale: String) {
    contentfulPage(title: { eq: "main" }, node_locale: { eq: $locale }) {
      title
      intro {
        liveText
        title
        description {
          description
        }
      }
      sections {
        title
        text {
          text
        }
        subText {
          subText
        }
        type
      }
      robotImages {
        fluid(maxWidth: 700) {
          ...GatsbyContentfulFluid_withWebp
        }
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
            idea {
              idea
            }
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
