import { FormattedMessage } from "gatsby-plugin-intl"
import React from "react"

import { blank } from "../../utils"
import Authors from "../authors"
import Markdown from "../markdown"
import styles from "./index.module.styl"
import cn from "classnames"
import FlaconLogo from "@/icons/flacon.inline.svg"
import LymLogo from "@/icons/lym.inline.svg"
import SenseLogo from "@/icons/sense.inline.svg"

const FooterMenu = ({ sections }) => (
  <div className="text-xs-L uppercase mt-40 sm:mt-24 flex sm:flex-col">
    <div className="w-1/2 sm:w-full bg-yellow pt-4 pl-4 sm:pl-2 pb-18">
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
    <div className="w-1/2 sm:w-full bg-grey pt-4 pl-2 sm:pb-32">
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
  <div className="pt-5 sm:pt-2 pb-14 sm:px-2 flex flex-col items-center">
    <ul>
      {credits.map((credit, creditIndex) => (
        <li key={creditIndex} className="mt-6 text-center">
          <div className="text-s-L uppercase">{credit.role}</div>
          <Markdown className={cn("mt-1 text-s-F uppercase", styles.creditText)}>
            {credit.name.name}
          </Markdown>
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
    <div className="py-7 sm:px-5 text-center text-s-F-c uppercase bg-grey">
      <FormattedMessage id="infoPartners" />
    </div>
    <div
      className={cn(
        "px-24 sm:px-2 flex sm:flex-col justify-center sm:items-center text-s-F-c uppercase py-20 sm:py-14 bg-lightGrey",
        styles.partners
      )}
    >
      <a className={cn("block", styles.flaconLogoBox)} href="https://flacon.ru" {...blank()}>
        <FlaconLogo className={styles.flaconLogo} />
      </a>
      <a className="block" href="" {...blank()}>
        <SenseLogo className={cn(styles.senseLogo, "ml-27 sm:ml-0")} />
      </a>
      <a className="block" href="" {...blank()}>
        <LymLogo className={cn(styles.lymLogo, "ml-27 sm:ml-0")} />
      </a>
    </div>
    <div className={cn("flex items-stretch", styles.finalBlock)}>
      <div className="w-1/2 sm:w-full bg-purple flex items-stretch">
        <div className="bg-green" style={{ width: "50%" }} />
        <div className="bg-purple" style={{ width: "7.9%" }} />
        <div className="bg-grey" style={{ width: "16.9%" }} />
        <div className="bg-red" style={{ width: "5%" }} />
        <div className="bg-purple" style={{ width: "2.7%" }} />
        <div className="bg-blue" style={{ width: "17.5%" }} />
      </div>
      <div className="w-1/2 sm:hidden bg-lightGrey" />
    </div>
  </footer>
)

export default Footer
