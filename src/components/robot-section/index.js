import React from "react"
import Section from "@/components/section"
import Img from "gatsby-image"

const RobotSection = ({ images, ...rest }) => (
  <Section className="mt-30 sm:mt-14" {...rest}>
    <div className="my-grid mt-12 sm:mt-3">
      <div className="col-start-1 col-span-6 sm:col-span-8">
        <Img fluid={images[0].fluid} />
        <Img className="mt-4 sm:mt-3" fluid={images[1].fluid} />
      </div>
      <div className="col-start-7 col-span-6 sm:col-start-1 sm:col-span-8 sm:mt-3">
        <Img fluid={images[2].fluid} />
      </div>
    </div>
  </Section>
)

export default RobotSection
