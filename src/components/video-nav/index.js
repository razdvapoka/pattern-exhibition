import React, { useCallback } from "react"
import cn from "classnames"
import styles from "./index.module.styl"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Thumbnail = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "video-thumbnail.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
}

const VideoNav = ({ isVisible, setIsVideoNavVisible }) => {
  const handleNavClick = useCallback(() => {
    setIsVideoNavVisible(false)
    const el = document.querySelector(`#video-1`)
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      })
    }
  }, [])
  return (
    <button
      className={cn("w-1/6 fixed cursor-pointer", styles.videoNav, {
        "opacity-0 pointer-events-none": !isVisible,
      })}
      onClick={handleNavClick}
    >
      <Thumbnail />
    </button>
  )
}

export default VideoNav
