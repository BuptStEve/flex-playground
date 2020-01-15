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

/**
 * 传入已有 uid 数组，生成不重复的4位随机字符串
 * @param {Array} uidArr 已有的 uid 数组，为了防止重复
 * @return {String} uid 生成的4位随机字符串
 */
export const genOneUid = (uidArr = []) => {
  let uid

  do {
    uid = Math.random().toString(36).slice(2, 6)
  } while (uidArr.includes(uid))

  return uid
}
