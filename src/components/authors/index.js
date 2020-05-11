import { FormattedMessage } from "gatsby-plugin-intl"
import React from "react"
import AliLogo from "@/icons/ali-logo.inline.svg"
import OrnamikaLogo from "@/icons/ornamica-logo.inline.svg"
import TwoAndHalfLogo from "@/icons/two-and-half-logo.inline.svg"
import styles from "./index.module.styl"

const Authors = ({ ...rest }) => (
  <div {...rest}>
    <div className="flex">
      <div className="w-1/2">
        <div className="py-7 text-s-F-c uppercase bg-grey text-center">
          <FormattedMessage id="techPartner" />
        </div>
      </div>
      <div className="w-1/2">
        <div className="py-7 text-s-F-c uppercase bg-yellow text-center">
          <FormattedMessage id="authors" />
        </div>
      </div>
    </div>
    <div className="flex">
      <div className="w-1/2">
        <div className="flex items-center justify-center py-5 bg-lightGrey">
          <AliLogo className={styles.aliLogo} />
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex h-full">
          <div className="w-1/2 flex items-center justify-center py-5 bg-grey">
            <OrnamikaLogo className={styles.ornamikaLogo} />
          </div>
          <div className="w-1/2 flex items-center justify-center py-5 bg-lightGrey">
            <TwoAndHalfLogo className={styles.twoAndHalfLogo} />
            <div className="text-s-F-c uppercase ml-4">
              Цифровая
              <br />
              лаборатория [2.5]
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
export default Authors
