import { CSS_PREFIX } from '@/consts'
import { forEach, isArray } from '@/utils'
import { useGlobalConfig } from '../useGlobalConfig'

const BLOCK_PREFIX = '-'
const ELEMENT_PREFIX = '__'
const MODIFIER_PREFIX = '--'
const STATE_PREFIX = 'is--'
const CSS_VAR_PREFIX = '--'
const CSS_VAR_JOIN_CHAR = '-'
const PUBLIC_CLS_PREFIX = '--'

const createBEM = (ns: string, block: string, blockSuffix: string, element: string, modifier: string) => {
  const cls = [ns, BLOCK_PREFIX, block]
  if (blockSuffix) {
    cls.push(BLOCK_PREFIX, blockSuffix)
  }
  if (element) {
    cls.push(ELEMENT_PREFIX, element)
  }
  if (modifier) {
    cls.push(MODIFIER_PREFIX, modifier)
  }
  return cls.map((str) => str.trim()).join('')
}

const createCssVarKey = (...args: string[]) => {
  return [CSS_VAR_PREFIX, ...args].map((str) => str.trim()).join(CSS_VAR_JOIN_CHAR)
}

type ClassName = string | string[] | null | undefined
type Classes = (ClassName | [any, ClassName, ClassName?])[]

export function useNamespace(block: string) {
  const ns = $(useGlobalConfig('namespace', CSS_PREFIX))
  const _bem = createBEM.bind(null, ns, block)
  const _key = createCssVarKey.bind(null, ns)

  const b = (blockSuffix = '') => _bem(blockSuffix, '', '')
  const e = (element = '') => (element ? _bem('', element, '') : '')
  const m = (modifier = '') => (modifier ? _bem('', '', modifier) : '')
  const be = (blockSuffix = '', element = '') => (blockSuffix && element ? _bem(blockSuffix, element, '') : '')
  const em = (element = '', modifier = '') => (element && modifier ? _bem('', element, modifier) : '')
  const bm = (blockSuffix = '', modifier = '') => (blockSuffix && modifier ? _bem(blockSuffix, '', modifier) : '')
  const bem = (blockSuffix = '', element = '', modifier = '') =>
    blockSuffix && element && modifier ? _bem(blockSuffix, element, modifier) : ''

  // use state
  const is: {
    (name: string): string
    (name: string, state?: boolean): string
  } = (name: string, ...args: [boolean?] | []) => {
    const state = args.length >= 1 ? args[0]! : true
    return name && state ? STATE_PREFIX + name.trim() : ''
  }

  // for css var
  // --moon-xxx: value;
  const cssVar = (obj: Record<string, string>) => {
    const styles: Record<string, string> = {}
    forEach(obj, (value, key) => {
      styles[_key(ns, key)] = value
    })
    return styles
  }
  // with block
  const cssVarBlock = (obj: Record<string, string>) => {
    const styles: Record<string, string> = {}
    forEach(obj, (value, key) => {
      styles[_key(block, key)] = value
    })
    return styles
  }

  const cssVarName = (name: string) => _key(name)
  const cssVarBlockName = (name: string) => _key(block, name)

  const compose = (...names: string[]) => {
    return names.map((name) => (name.startsWith(ns) ? name : ns + PUBLIC_CLS_PREFIX + name))
  }
  const classes = (...args: Classes) => {
    return args
      .map((className) => {
        if (isArray(className)) {
          const [condition, truthy, falsy = null] = className
          return condition ? truthy : falsy
        }
        return className
      })
      .flat()
  }

  return {
    namespace: ns,
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is,
    cssVar,
    cssVarBlock,
    cssVarName,
    cssVarBlockName,
    compose,
    classes
  }
}
