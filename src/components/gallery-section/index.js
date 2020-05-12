import React from "react"

const GallerySection = ({
  setIsVideoNavVisible,
  title,
  text,
  url,
  subText,
  isInFooter,
  ...rest
}) => (
  <div className="h-screen" {...rest}>
    gallery section
  </div>
)

export default GallerySection
