import { FixedBottom } from "react-fixed-bottom"
import { graphql } from "gatsby"
import { isSameDay, addMinutes, isWithinInterval } from "date-fns"
import { useIntl } from "gatsby-plugin-intl"
import React, { useEffect, useCallback, useMemo, useState } from "react"

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
import CuratorsSection from "@/components/curators-section"
import GallerySection from "@/components/gallery-section"
import Intro from "@/components/intro"
import Layout from "@/components/layout"
import Marquee from "@/components/marquee"
import Menu from "@/components/menu"
import RobotSection from "@/components/robot-section"
import SEO from "@/components/seo"
import ScheduleSection from "@/components/schedule-section"
import Section from "@/components/section"
import SubscribeSection from "@/components/subscribe-section"
import VideoSection from "@/components/video-section"

import AssociationsSection from "../components/associations-section"
import ClientOnly from "../components/client-only"
import Footer from "../components/footer"
import VideoNav from "../components/video-nav"

const getSection = (
  type,
  { data, setIsVideoNavVisible, schedule, curatedPatterns, isPlayerApiReady }
) => {
  switch (type) {
    case SECTION_ABOUT:
      return {
        component: Section,
        props: {
          hasSeparator: true,
          className: "mt-24 sm:mt-14",
        },
      }
    case SECTION_VIDEO_1:
      return {
        component: VideoSection,
        props: {
          className: "mt-24 sm:mt-8",
          setIsVideoNavVisible,
          isPlayerApiReady,
          videoId: "video-1-iframe",
          videoSrc: "fF4hIGqqvq8",
        },
      }
    case SECTION_SUBSCRIBE:
      return {
        component: SubscribeSection,
      }
    case SECTION_ROBOT:
      return {
        component: RobotSection,
        props: {
          images: data.robotImages,
        },
      }
    case SECTION_VIDEO_2:
      return {
        component: VideoSection,
        props: {
          className: "mt-24 sm:mt-14",
          setIsVideoNavVisible,
          isPlayerApiReady,
          videoId: "video-2-iframe",
          videoSrc: "fF4hIGqqvq8",
        },
      }
    case SECTION_ROUND_TABLE:
      return {
        component: Section,
        props: {
          className: "mt-40 sm:mt-20",
        },
      }
    case SECTION_ASSOCIATIONS:
      return {
        component: AssociationsSection,
        props: {
          associations: data.associations,
        },
      }
    case SECTION_GALLERY:
      return {
        component: GallerySection,
        props: {
          items: data.gallery,
        },
      }
    case SECTION_SCHEDULE:
      return {
        component: ScheduleSection,
        props: {
          schedule,
        },
      }
    case SECTION_CURATORS:
      return {
        component: CuratorsSection,
        props: {
          curatedPatterns,
        },
      }
    default:
      return {
        component: "section",
      }
  }
}

const Sections = ({ data, setIsVideoNavVisible, schedule, curatedPatterns, isPlayerApiReady }) =>
  data.sections.map((section, sectionIndex) => {
    const { component: SectionComponent, props } = getSection(section.type, {
      data,
      setIsVideoNavVisible,
      schedule,
      curatedPatterns,
      isPlayerApiReady,
    })
    return <SectionComponent key={sectionIndex} {...section} {...props} />
  })

const IndexPage = ({ data: { contentfulPage, allContentfulCurator } }) => {
  const intl = useIntl()
  const [currentPatternIndex, setCurrentPatternIndex] = useState(-1)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVideoNavVisible, setIsVideoNavVisible] = useState(true)
  const [isPlayerApiReady, setIsPlayerApiReady] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen)
  }, [isMenuOpen, setIsMenuOpen])

  const fullSchedule = useMemo(
    () =>
      contentfulPage.schedule.map(day => ({
        ...day,
        items: day.items
          .reduce(
            ({ passed, items }, item) => {
              const start = addMinutes(new Date(day.start), passed * 60)
              const end = addMinutes(new Date(day.start), (passed + item.duration) * 60)

              return {
                passed: passed + item.duration,
                items: [
                  ...items,
                  {
                    ...item,
                    start,
                    end,
                  },
                ],
              }
            },
            { passed: 0, items: [] }
          )
          .items.filter(item => item.pattern),
      })),
    [contentfulPage]
  )

  const todaySchedule = useMemo(() => {
    return fullSchedule.find(d => {
      return isSameDay(new Date(d.start), new Date())
    })
  }, [fullSchedule])

  const todayCuratedPatterns = useMemo(() => {
    return todaySchedule ? todaySchedule.items.filter(item => item.curator) : []
  }, [todaySchedule])

  const flatSchedule = useMemo(
    () => fullSchedule.reduce((fs, day) => [...fs, ...day.items.filter(i => i.pattern)], []),
    [fullSchedule]
  )

  const { cp: curatedPatterns } = useMemo(
    () =>
      flatSchedule
        .filter(item => item.curator)
        .reduce(
          ({ cp, curatorIds }, item) => {
            const curatorId = item.curator.id
            return {
              cp: curatorIds.indexOf(curatorId) === -1 ? [...cp, item] : cp,
              curatorIds: [...curatorIds, item.curator.id],
            }
          },
          { cp: [], curatorIds: [] }
        ),
    [flatSchedule]
  )

  const marqueeItems = [
    {
      text: intl.formatMessage({ id: "aboutRobot" }),
      navText: intl.formatMessage({ id: "moreHintMarquee" }),
      navHash: "robot",
    },
    currentPatternIndex >= 0
      ? {
          text: intl.formatMessage(
            { id: "robotDrawing" },
            { pattern: flatSchedule[currentPatternIndex].pattern.externalId }
          ),
          navText: intl.formatMessage({ id: "patternHintMarquee" }),
          navHash: "schedule",
        }
      : null,
    todayCuratedPatterns.length > 0
      ? {
          text: intl.formatMessage(
            {
              id: "curatorMarquee",
            },
            {
              curator: todayCuratedPatterns[0].curator.name,
              pattern: todayCuratedPatterns[0].pattern.externalId,
            }
          ),
          navText: intl.formatMessage({ id: "moreHintMarquee" }),
          navHash: "schedule",
        }
      : null,
  ].filter(Boolean)

  useEffect(() => {
    if (window.YT) {
      setIsPlayerApiReady(true)
    } else {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      window.onYouTubeIframeAPIReady = () => {
        setIsPlayerApiReady(true)
      }
    }
  }, [setIsPlayerApiReady])

  useEffect(() => {
    const currentPatternIndex = flatSchedule.findIndex(({ start, end }) =>
      isWithinInterval(new Date(), { start, end })
    )
    setCurrentPatternIndex(currentPatternIndex)
  }, [flatSchedule, setCurrentPatternIndex])

  return (
    <Layout toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}>
      <SEO title="live.ornamika" />
      <Menu sections={contentfulPage.sections} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <Intro {...contentfulPage.intro} />
      <VideoNav
        isVisible={isVideoNavVisible}
        setIsVideoNavVisible={setIsVideoNavVisible}
        isPlayerApiReady={isPlayerApiReady}
      />
      <ClientOnly>
        <FixedBottom>
          <Marquee
            items={[
              ...marqueeItems,
              ...marqueeItems,
              ...marqueeItems,
              ...marqueeItems,
              ...marqueeItems,
            ]}
          />
        </FixedBottom>
      </ClientOnly>
      <Sections
        data={contentfulPage}
        schedule={{
          items: fullSchedule,
          todaySchedule,
          currentPatternIndex,
        }}
        curatedPatterns={curatedPatterns}
        setIsVideoNavVisible={setIsVideoNavVisible}
        isPlayerApiReady={isPlayerApiReady}
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
        secondTitle {
          secondTitle
        }
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
        cutText {
          cutText
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
        buyUrl
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
            id
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
