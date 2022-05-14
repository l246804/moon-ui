<template>
  {{ SubVNodes }}
</template>

<script
  lang="ts"
  setup
>
import { renderSlot } from 'vue'
import { provideGlobalConfig } from '@/hooks/useGlobalConfig'
import { configProviderProps } from './props'

const props = defineProps(configProviderProps)
const slots = useSlots()

const config = provideGlobalConfig(props)

const SubVNodes = renderSlot(slots, 'default', { config })
</script>

<script lang="ts">
// eslint-disable-next-line no-unreachable
export default {
  name: 'MConfigProvider'
}
</script>
