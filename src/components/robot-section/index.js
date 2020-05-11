import React from "react"
import Section from "@/components/section"
import Img from "gatsby-image"

const RobotSection = ({ images, ...rest }) => (
  <Section className="mt-30" {...rest}>
    <div className="my-grid mt-12">
      <div className="col-start-1 col-span-6">
        <Img fluid={images[0].fluid} />
        <Img className="mt-4" fluid={images[1].fluid} />
      </div>
      <div className="col-start-7 col-span-6">
        <Img fluid={images[2].fluid} />
      </div>
    </div>
  </Section>
)

export default RobotSection
