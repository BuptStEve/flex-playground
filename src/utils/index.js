/**
 * @Author: steve
 * @Date:   2017-Jun-15 18:14:53
 * @Last modified by:   steve
 * @Last modified time: 2017-Jun-15 18:14:53
 */

const DEFAULT_DEMO_WIDTH = 50
const MIN_DEMO_WIDTH = 20
const MAX_DEMO_WIDTH = 75

const isDemoWidthValid = (width) => {
  if (isNaN(width)) return false
  if (width < MIN_DEMO_WIDTH) return false
  if (width > MAX_DEMO_WIDTH) return false

  return true
}

export const getValidDemoWidth = (width) =>
  isDemoWidthValid(Number(width))
    ? Number(width)
    : DEFAULT_DEMO_WIDTH
