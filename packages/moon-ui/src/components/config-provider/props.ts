import type { ExtractPropTypes } from 'vue'
import { CSS_PREFIX } from '@/consts'
import { buildProps } from '@/utils'

export const configProviderProps = buildProps({
  namespace: {
    type: String,
    default: CSS_PREFIX
  }
} as const)

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>
