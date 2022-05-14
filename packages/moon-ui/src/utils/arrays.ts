import { isArray, isNullish } from './types'

export const removeItem = <T = unknown>(arr: T[], item: T) => {
  if (arr.length > 0) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
  return []
}

export const unique = <T = unknown>(arr: T[]) => [...new Set(arr)]

export const ensureArray = <T = unknown>(arr: T | T[]) => {
  if (isNullish(arr)) return []
  return isArray(arr) ? arr : [arr]
}

export const indexOf = (arr: any[], item: any) => arr.indexOf(item)

export const oneOf = (arr: any[], item: any) => indexOf(arr, item) > -1

export const findArr = (arr: any[], item: any) => {
  const index = indexOf(arr, item)
  if (index > -1) {
    return arr[index]
  }
  return null
}

export const slice = <T extends any[] = any[]>(arr: T, start?: number, end?: number) =>
  Array.from<T>(arr).slice(start, end) as Array<T>
