import { graphql } from "gatsby"
import { isSameDay, addMinutes, isWithinInterval } from "date-fns"
import React, { useCallback, useMemo, useState } from "react"
import { useIntl } from "gatsby-plugin-intl"

import {
  SECTION_ABOUT,
  SECTION_VIDEO_1,
  SECTION_SCHEDULE,
  SECTION_SUBSCRIBE,
  SECTION_VIDEO_2,
  SECTION_CURATORS,
  SECTION_ROBOT,
  SECTION_GALLERY,
  SECTION_ROUND_TABLE,
  SECTION_ASSOCIATIONS,
} from "@/consts"
import Menu from "@/components/menu"
import CuratorsSection from "@/components/curators-section"
import GallerySection from "@/components/gallery-section"
import Intro from "@/components/intro"
import Layout from "@/components/layout"
import Marquee from "@/components/marquee"
import RobotSection from "@/components/robot-section"
import SEO from "@/components/seo"
import ScheduleSection from "@/components/schedule-section"
import Section from "@/components/section"
import SubscribeSection from "@/components/subscribe-section"
import VideoSection from "@/components/video-section"

import AssociationsSection from "../components/associations-section"
import Footer from "../components/footer"
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
        props: {
          items: data.gallery,
        },
      }
    case SECTION_ROUND_TABLE:
      return {
        component: Section,
        props: {
          className: "mt-40",
        },
      }
    case SECTION_ASSOCIATIONS:
      return {
        component: AssociationsSection,
        props: {
          className: "mt-24",
          associations: data.associations,
        },
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
  const intl = useIntl()
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [isVideoNavVisible, setIsVideoNavVisible] = useState(true)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen)
  }, [isMenuOpen, setIsMenuOpen])

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
    <Layout toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}>
      <SEO title="Home" />
      <Menu sections={contentfulPage.sections} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <Intro {...contentfulPage.intro} />
      <VideoNav isVisible={isVideoNavVisible} setIsVideoNavVisible={setIsVideoNavVisible} />
      <Marquee
        items={[
          {
            text: intl.formatMessage({ id: "aboutRobot" }),
            navText: intl.formatMessage({ id: "moreHintMarquee" }),
            navHash: "robot",
          },
          currentPattern
            ? {
                text: intl.formatMessage(
                  { id: "robotDrawing" },
                  { pattern: currentPattern.externalId }
                ),
                navText: intl.formatMessage({ id: "patternHintMarquee" }),
                navHash: "schedule",
              }
            : null,
          curatorDays.length > 0
            ? {
                text: intl.formatMessage(
                  {
                    id: "curatorMarquee",
                  },
                  {
                    curator: curatorDays[0].curator.name,
                    pattern: curatorDays[0].pattern.externalId,
                  }
                ),
                navText: intl.formatMessage({ id: "moreHintMarquee" }),
                navHash: "schedule",
              }
            : null,
        ].filter(Boolean)}
      />
      <Sections
        data={contentfulPage}
        schedule={{ items: todaySchedule.items, lastUpdate: todaySchedule.updatedAt }}
        curatorDays={curatorDays}
        setIsVideoNavVisible={setIsVideoNavVisible}
      />
      <Footer sections={contentfulPage.sections} credits={contentfulPage.credits} />
    </Layout>
  )
}

export const query = graphql`
  query MainPage($locale: String) {
    contentfulPage(title: { eq: "main" }, node_locale: { eq: $locale }) {
      title
      associations
      credits {
        url
        urlText
        role
        name {
          name
        }
      }
      intro {
        liveText
        title
        description {
          description
        }
      }
      sections {
        title
        isInFooter
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
      gallery {
        title
        externalId
        image {
          fluid(maxWidth: 450) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        thumbnail {
          fluid(maxWidth: 450) {
            ...GatsbyContentfulFluid_withWebp
          }
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
