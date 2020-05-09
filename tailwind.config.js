const ROOT_FONT_SIZE = 24

const pxToRem = px => `${px / ROOT_FONT_SIZE}rem`

const sequence = length => Array.from(Array(length).keys())

const spacing = sequence(21).reduce(
  (s, i) => ({
    ...s,
    [i]: pxToRem(i * 5),
  }),
  {}
)

module.exports = {
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    colors: {
      pureBlack: "#000000",
      black: "#3a3a3a",
      white: "#ffffff",
      yellow: "#FBFF3E",
      grey: "#C9CDCF",
      lightGrey: "#E7E7E8",
      darkGrey: "#6F6F6F",
      red: "#DC533C",
      pale: "#EDF1F3",
    },
    spacing,
  },
}
