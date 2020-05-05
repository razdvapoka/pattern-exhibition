import React from "react"

const Section = ({ children, title, text }) => (
  <section>
    <div className="px-5"></div>
    {children}
  </section>
)

export default Section
