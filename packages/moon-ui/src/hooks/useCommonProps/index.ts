import { buildProp } from '@/utils'

export const useSizeProp = () => {
  return {
    size: buildProp({
      type: String,
      values: ['normal', 'mini', 'small', 'large'],
      default: 'normal'
    } as const)
  }
}

export const useAutoLoadingProp = () => {
  return {
    autoLoading: buildProp({
      type: Boolean,
      default: false
    } as const)
  }
}

export const useLoadingProp = () => {
  return {
    loading: buildProp({
      type: Boolean,
      default: false
    } as const)
  }
}

export const useDisabledProp = () => {
  return {
    disabled: buildProp({
      type: Boolean,
      default: false
    } as const)
  }
}
