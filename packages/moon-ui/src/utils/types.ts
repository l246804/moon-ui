export const isNull = (value: unknown): value is null => value === null

export const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined'

export const isNullish = (value: unknown): value is never => isNull(value) || isUndefined(value)

export const isNumber = (value: unknown): value is number => typeof value === 'number'

export const isString = (value: unknown): value is string => typeof value === 'string'

export const isArray = (value: unknown): value is any[] => Array.isArray(value)

export const isFunction = (value: unknown): value is Function => typeof value === 'function'

export const isObjectLike = (value: unknown): value is object | null => typeof value === 'object' || isFunction(value)

export const isObject = (value: unknown): value is object => !isNull(value) && isObjectLike(value)
