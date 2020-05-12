import { FormattedMessage } from "gatsby-plugin-intl"
import React from "react"

import { blank } from "../../utils"
import Authors from "../authors"
import Markdown from "../markdown"

const FooterMenu = ({ sections }) => (
  <div className="text-xs-L uppercase mt-40 flex">
    <div className="w-1/2 bg-yellow pt-4 pl-4 pb-18">
      <ul>
        {sections
          .filter(section => section.isInFooter)
          .map((section, sectionIndex) => (
            <li key={sectionIndex} className="mb-2">
              <a className="" href={`#${section.type}`}>
                {section.title}
              </a>
            </li>
          ))}
      </ul>
    </div>
    <div className="w-1/2 bg-grey pt-4 pl-2">
      <ul>
        <li>
          <a href="https://www.facebook.com/ornamikaproject/" {...blank()}>
            facebook
          </a>
        </li>
        <li className="mt-2">
          <a href="https://www.instagram.com/ornamika_official/" {...blank()}>
            instagram
          </a>
        </li>
        <li className="mt-2">
          <a href="mailto:hello@ornamika.ru">
            <FormattedMessage id="mailUs" />
          </a>
        </li>
      </ul>
    </div>
  </div>
)

const Credits = ({ credits }) => (
  <div className="pt-5 pb-14 flex flex-col items-center">
    <ul>
      {credits.map((credit, creditIndex) => (
        <li key={creditIndex} className="mt-6 text-center">
          <div className="text-s-L uppercase">{credit.role}</div>
          <Markdown className="mt-1 text-s-F uppercase">{credit.name.name}</Markdown>
          {credit.url && (
            <a className="block text-xs-L uppercase mt-1" href={credit.url} {...blank()}>
              {credit.urlText}
            </a>
          )}
        </li>
      ))}
    </ul>
  </div>
)

const Footer = ({ credits, sections }) => (
  <footer>
    <FooterMenu sections={sections} />
    <Authors />
    <Credits credits={credits} />
    <div className="py-7 text-center text-s-F-c uppercase bg-grey">
      <FormattedMessage id="infoPartners" />
    </div>
    <div className="px-24 flex justify-between text-s-F-c uppercase py-20 bg-lightGrey">
      <span>logo</span>
      <span>logo</span>
      <span>logo</span>
      <span>logo</span>
      <span>logo</span>
      <span>logo</span>
    </div>
    <div className="flex items-stretch h-screen">
      <div className="w-1/2 bg-purple flex items-stretch">
        <div className="bg-green" style={{ width: "50%" }} />
        <div className="bg-purple" style={{ width: "7.9%" }} />
        <div className="bg-grey" style={{ width: "16.9%" }} />
        <div className="bg-red" style={{ width: "5%" }} />
        <div className="bg-purple" style={{ width: "2.7%" }} />
        <div className="bg-blue" style={{ width: "17.5%" }} />
      </div>
      <div className="w-1/2 bg-lightGrey" />
    </div>
  </footer>
)

export default Footer
