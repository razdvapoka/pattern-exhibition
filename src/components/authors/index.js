import { FormattedMessage } from "gatsby-plugin-intl"
import React from "react"
import AliLogo from "@/icons/ali-logo.inline.svg"
import OrnamikaLogo from "@/icons/ornamika-logo.inline.svg"
import TwoAndHalfLogo from "@/icons/two-and-half-logo.inline.svg"
import styles from "./index.module.styl"

const Authors = ({ ...rest }) => (
  <div {...rest}>
    <div className="flex sm:flex-col sm:hidden">
      <div className="w-1/2 sm:w-full">
        <div className="py-7 text-s-F-c uppercase bg-grey text-center">
          <FormattedMessage id="techPartner" />
        </div>
      </div>
      <div className="w-1/2 sm:w-full">
        <div className="py-7 text-s-F-c uppercase bg-yellow text-center">
          <FormattedMessage id="authors" />
        </div>
      </div>
    </div>
    <div className="flex sm:flex-col sm:hidden">
      <div className="w-1/2 sm:w-full">
        <div className="flex items-center justify-center py-5 bg-lightGrey h-full">
          <AliLogo className={styles.aliLogo} />
        </div>
      </div>
      <div className="w-1/2 sm:w-full">
        <div className="flex h-full">
          <div className="w-1/2 flex items-center justify-center py-5 bg-grey">
            <OrnamikaLogo className={styles.ornamikaLogo} />
          </div>
          <div className="w-1/2 flex items-center justify-center py-5 bg-lightGrey">
            <TwoAndHalfLogo className={styles.twoAndHalfLogo} />
          </div>
        </div>
      </div>
    </div>
    <div className="hidden sm:block">
      <div className="py-8 text-s-F-c uppercase bg-yellow text-center">
        <FormattedMessage id="authors" />
      </div>
      <div className="flex items-center justify-center py-7 bg-grey">
        <OrnamikaLogo className={styles.ornamikaLogo} />
      </div>
      <div className="flex items-center justify-center py-7 bg-lightGrey">
        <TwoAndHalfLogo className={styles.twoAndHalfLogo} />
      </div>
      <div className="py-6 px-10 text-s-F-c uppercase bg-grey text-center">
        <FormattedMessage id="techPartner" />
      </div>
      <div className="flex items-center justify-center py-7 bg-lightGrey h-full">
        <AliLogo className={styles.aliLogo} />
      </div>
    </div>
  </div>
)
export default Authors
