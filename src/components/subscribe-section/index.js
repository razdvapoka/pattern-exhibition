import { FormattedMessage } from "gatsby-plugin-intl"
import React, { useCallback, useState } from "react"
import cn from "classnames"
import jsonp from "jsonp"
import toQueryString from "to-querystring"

import { blank } from "../../utils"
import Markdown from "../markdown"
import styles from "./index.module.styl"

const MAILCHIMP_URL =
  "https://dev.us18.list-manage.com/subscribe/post-json?u=cbce4c710a25008dbbcaf1c90&amp;id=3e0afba3c2"
const MAILCHIMP_SECRET = "b_cbce4c710a25008dbbcaf1c90_3e0afba3c2"
const EMAIL_REGEX = /.+@.+\..+/

const SubscribeSection = ({ text: { text }, subText, isInFooter, ...rest }) => {
  const [email, setEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [status, setStatus] = useState(null)
  const handleEmailChange = useCallback(
    e => {
      setStatus(null)
      setEmail(e.target.value)
      setIsEmailValid(EMAIL_REGEX.test(e.target.value))
    },
    [setEmail]
  )
  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      const params = toQueryString({
        EMAIL: email,
        [MAILCHIMP_SECRET]: "",
      })
      const url = `${MAILCHIMP_URL}&${params}`
      jsonp(
        url,
        {
          param: "c",
        },
        (err, data) => {
          if (!err) {
            const { result } = data
            setStatus(result)
          } else {
            setStatus("error")
          }
        }
      )
    },
    [email]
  )
  const success = status === "success"
  const error = status === "error"
  return (
    <section className="mt-22" {...rest}>
      <div className={cn("flex", styles.block)}>
        <div className="w-1/2 flex items-center justify-center bg-yellow text-l-F-c uppercase">
          <FormattedMessage id="leaveEmail" />
        </div>
        <div className="w-1/2 flex items-center justify-center bg-pale px-11">
          <form onSubmit={handleSubmit} className="w-full">
            <div className={cn(styles.inputBox, "flex", { "border-red": error })}>
              <input
                type="text"
                value={email}
                placeholder="hello@world.com"
                name="EMAIL"
                className={cn("text-s-F-c uppercase w-full", styles.emailInput)}
                onChange={handleEmailChange}
                disabled={success}
              />
              <input
                className={cn(
                  "ml-1 text-m-W",
                  { "text-grey pointer-events-none": !isEmailValid },
                  { "pointer-events-none": success },
                  { "text-red": error }
                )}
                type="submit"
                disabled={!isEmailValid || success || error}
                value={success ? "✓" : "→"}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center bg-grey py-12 text-center text-m-F">
        <Markdown>{text}</Markdown>
      </div>
      <div className={cn("flex text-m-L-c uppercase", styles.block)}>
        <div className="w-1/2 flex items-center justify-center bg-blue">
          <a href="https://www.facebook.com/ornamikaproject/" {...blank()}>
            facebook
          </a>
        </div>
        <div className="w-1/2 flex items-center justify-center bg-purple">
          <a href="https://www.instagram.com/ornamika_official/" {...blank()}>
            instagram
          </a>
        </div>
      </div>
    </section>
  )
}

export default SubscribeSection
