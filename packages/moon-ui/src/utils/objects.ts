import { ensureArray, oneOf } from './arrays'
import { isArray, isNullish, isObject } from './types'

export const keysOf = (value: object) => (isNullish(value) ? [] : Object.keys(value))

export const hasOwn = (obj: object, key: PropertyKey) => Reflect.has(obj, key)

export const getOwnSymbols = (obj: any) => Object.getOwnPropertySymbols(obj)

export const toEntries = (obj: Parameters<typeof Object.entries>[0]) => Object.entries(obj)

export const fromEntries = (entries: Parameters<typeof Object.fromEntries>[0]) => Object.fromEntries(entries)

export const getProtoOf = (target: object) => (isNullish(target) ? null : Reflect.getPrototypeOf(Object(target)))

export const forEach = <T extends object = any>(
  obj: T,
  iterator: (value: any, key: T extends any[] ? number : string, context: T, interrupter: () => void) => void
) => {
  let isInterrupted = false
  const interrupter = () => {
    isInterrupted = true
  }

  const keys = keysOf(obj)
  const isArr = isArray(obj)
  for (const key of keys) {
    const value = keys[key]
    // @ts-ignore
    iterator.apply(obj, [value, isArr ? parseInt(key, 10) : key, obj, interrupter])

    if (isInterrupted) break
  }
}

export function deepCopy<T extends object = any>(target: T): T
export function deepCopy<T extends object = any>(target: T, hits?: any[]): T
export function deepCopy<T extends object = any>(target: T, hits?: any[]): T {
  if (!isObject(target)) return target

  const _hits = ensureArray(hits)
  if (oneOf(_hits, target)) {
    return target
  }

  _hits!.push(target)

  const Ctor = getProtoOf(target)!.constructor
  // @ts-ignore
  const copied = new Ctor()
  forEach(target, (value, key) => {
    copied[key] = deepCopy(value, _hits)
  })

  return copied
}

export const assign = (target: object, ...sources: object[]) => {
  return Object.assign(target, ...sources)
}

export const assignSafely = (target: object, ...sources: object[]) => {
  return assign({}, target, ...sources)
}

export const assignSafelyDeep = (target: object, ...sources: object[]) => {
  const assigned = assignSafely(target, ...sources)
  return deepCopy(assigned)
}
