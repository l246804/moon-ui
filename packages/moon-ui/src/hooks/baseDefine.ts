import { ComponentOptions } from 'vue'

export const BASE_PREFIX = 'M'

export function useBaseDefine(options: Pick<ComponentOptions, 'name' | 'inheritAttrs'>) {
  return {
    name: BASE_PREFIX + options.name,
    inheritAttrs: options.inheritAttrs
  }
}
