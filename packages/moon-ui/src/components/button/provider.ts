import type { InjectionKey } from 'vue'
import { ButtonProps } from './props'

export type ButtonProviderContext = Partial<Pick<ButtonProps, 'type' | 'size' | 'autoLoading'>>

export const buttonProviderContextKey: InjectionKey<ButtonProviderContext> = Symbol('buttonProviderContextKey')
