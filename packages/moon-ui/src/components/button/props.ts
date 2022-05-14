import { ExtractPropTypes, PropType } from 'vue'
import { useAutoLoadingProp, useDisabledProp, useLoadingProp, useSizeProp } from '@/hooks/useCommonProps'
import { buildProps } from '@/utils'

export const buttonProps = buildProps({
  htmlType: {
    type: String,
    values: ['button', 'reset', 'submit'],
    default: 'button'
  },
  type: {
    type: String,
    values: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
    default: 'default'
  },
  block: {
    type: Boolean,
    default: false
  },
  ghost: {
    type: Boolean,
    default: false
  },
  text: {
    type: Boolean,
    default: false
  },
  onClick: {
    type: Function as PropType<(e: MouseEvent) => void | Promise<any>>
  },
  ...useSizeProp(),
  ...useLoadingProp(),
  ...useAutoLoadingProp(),
  ...useDisabledProp()
} as const)

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
