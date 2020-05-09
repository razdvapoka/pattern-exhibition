import React, { useState, useEffect } from "react"
import cn from "classnames"
import Eye from "@/icons/eye.inline.svg"
import io from "socket.io-client"
import styles from "./index.module.styl"

const UserCount = () => {
  const [userCount, setUserCount] = useState(null)
  useEffect(() => {
    const socket = io("https://live-counter.counter.ornamika.com/")
    socket.on("user joined", msg => {
      setUserCount(msg.userCount)
    })
    socket.on("user left", msg => {
      setUserCount(msg.userCount)
    })
    socket.emit("add user")
    return () => {
      socket.disconnect()
    }
  }, [setUserCount])
  return (
    <div
      className={cn(
        styles.userCount,
        `
        flex items-center justify-center
        absolute left-0 top-0
        h-full
        bg-white text-pureBlack
        text-s-alt
        z-10
        px-5
        `,
        { "opacity-0": !userCount }
      )}
    >
      <Eye className={styles.eye} />
      {userCount}
    </div>
  )
}

export default UserCount
