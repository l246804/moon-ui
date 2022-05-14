import type { MaybeRef } from '@vueuse/core'
import type { App, Ref } from 'vue'
import { ConfigProviderContext, configProviderContextKey } from '@/components/config-provider'
import { keysOf, unique } from '@/utils'
import { debugWarn } from '@/utils/error'

const globalConfig = ref<ConfigProviderContext>()

export function useGlobalConfig<K extends keyof ConfigProviderContext, D extends ConfigProviderContext[K]>(
  key: K,
  defaultValue?: D
): Ref<Exclude<ConfigProviderContext[K], undefined | D>>
export function useGlobalConfig(): Ref<ConfigProviderContext>
export function useGlobalConfig(key?: keyof ConfigProviderContext, defaultValue = undefined) {
  const config = $(getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig)
  if (key) {
    return computed(() => config?.[key] ?? defaultValue)
  }
  return $$(config)
}

export function provideGlobalConfig(config: MaybeRef<ConfigProviderContext>, app?: App, global = false) {
  const inSetup = !!getCurrentInstance()
  const oldConfig = inSetup ? useGlobalConfig() : undefined

  const provideFn = app?.provide ?? (inSetup ? provide : undefined)
  if (!provideFn) {
    return debugWarn('provideGlobalConfig', 'provideGlobalConfig() can only be used inside setup().')
  }

  const context = computed(() => {
    const cfg = unref(config)
    if (!oldConfig?.value) return cfg
    return mergeConfig(oldConfig.value, cfg)
  })
  provideFn(configProviderContextKey, context)

  if (global || !globalConfig.value) {
    globalConfig.value = context.value
  }

  return context
}

function mergeConfig(a: ConfigProviderContext, b: ConfigProviderContext) {
  const keys = unique([...keysOf(a), ...keysOf(b)])
  const obj = {}
  for (const key of keys) {
    obj[key] = b[key] ?? a[key]
  }
  return obj
}
