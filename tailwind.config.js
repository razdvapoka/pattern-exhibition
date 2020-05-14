const ROOT_FONT_SIZE = 24

const pxToRem = px => `${px / ROOT_FONT_SIZE}rem`

const sequence = length => Array.from(Array(length).keys())

const spacing = sequence(41).reduce(
  (s, i) => ({
    ...s,
    [i]: pxToRem(i * 5),
  }),
  {}
)

module.exports = {
  theme: {
    screens: {
      sm: { max: "639px" },
    },
    colors: {
      pureBlack: "#000000",
      black: "#3a3a3a",
      blackBg: "#242424",
      white: "#ffffff",
      yellow: "#D9FD85",
      grey: "#C8CDD0",
      lightGrey: "#E2E3E5",
      greyText: "#9C9C9C",
      greyBg: "#313131",
      greyTagBg: "#373737",
      red: "#DC533C",
      pale: "#EDF1F3",
      green: "#91E595",
      blue: "#547BE1",
      purple: "#C658E3",
      plum: "#B861DC",
    },
    spacing,
  },
}
