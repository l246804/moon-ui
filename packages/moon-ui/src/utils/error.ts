import { isString } from './types'

class MoonUIError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MoonUIError'
  }
}

const buildErrorMsg = (scope: string, message?: string) => `[${scope}] ${message}`

export function throwError(scope: string, message: string): never {
  throw new MoonUIError(buildErrorMsg(scope, message))
}

export function debugWarn(err: Error): void
export function debugWarn(scope: string, message: string): void
export function debugWarn(scope: string | Error, message?: string): void {
  if (!import.meta.env.PROD) {
    const error = isString(scope) ? new MoonUIError(buildErrorMsg(scope, message)) : scope
    console.warn(error)
  }
}
