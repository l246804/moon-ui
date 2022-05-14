export const usePending = () => {
  let resolve!: (value: unknown) => void
  let reject!: (reason?: any) => void

  const initPromise = () => {
    return new Promise((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })
  }

  initPromise()

  return {
    resolve,
    reject
  }
}
