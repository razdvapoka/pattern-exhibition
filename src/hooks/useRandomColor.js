import { useState, useCallback } from "react"

import { COLORS } from "../consts"
import { randomItem, sequence } from "../utils"

export const useRandomColor = () => {
  const [randomColorIndex, setRandomColorIndex] = useState(0)
  const updateRandomColorIndex = useCallback(() => {
    const colorIndicies = sequence(COLORS.length)
    const colorIndeciesWithoutCurrent = [
      ...colorIndicies.slice(0, randomColorIndex),
      ...colorIndicies.slice(randomColorIndex + 1),
    ]
    const newRandomIndex = randomItem(colorIndeciesWithoutCurrent)
    setRandomColorIndex(newRandomIndex)
  }, [setRandomColorIndex, randomColorIndex])
  return {
    randomColorIndex,
    updateRandomColorIndex,
  }
}
