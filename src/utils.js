export const blank = () => ({
  target: "_blank",
  rel: "noopener noreferrer",
})

export const sequence = length => Array.from(Array(length).keys())
export const randomItem = arr => arr[Math.floor(Math.random() * arr.length)]

export const tail = arr => arr[arr.length - 1]
export const sum = arr => arr.reduce((s, i) => s + i, 0)
