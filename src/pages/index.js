import React from "react"
import "../styles/index.styl"

const IndexPage = () => (
  <div className="px-2 text-l-F bg-yellow uppercase fixed left-0 top-0 w-full h-full flex justify-center items-center">
    <span>
      выставка ornamika.live откроется 21.05.2020
      <br />
      Пока вы можете зайти на сайт{" "}
      <a href="https://ornamika.com" target="_blank" rel="noopener noreferrer">
        Ornamika.com
      </a>
      .
    </span>
  </div>
)

export default IndexPage
