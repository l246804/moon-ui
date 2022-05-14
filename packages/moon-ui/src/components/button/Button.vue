<template>
  <button
    :type="htmlType"
    :class="classes"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script
  setup
  lang="ts"
>
import { useNamespace } from '@/hooks/useNamespace'
import { buttonProps } from './props'

const props = defineProps(buttonProps)

const ns = useNamespace('button')
const classes = $computed(() => {
  return ns.classes(
    ns.b(),
    ns.is(props.size),
    [props.block, ns.compose('flex', ns.is('block')), ns.compose('inline-flex')],
    [props.text, [ns.is('text'), ns.is(`text-${props.type}`)], ns.is(props.type)],
    [props.disabled, ns.is('disabled')],
    [props.text && props.disabled, ns.is('text-disabled')]
  )
})

let pending = $ref(false)
const attemptAutoLoading = (result) => {
  if (!props.autoLoading) return

  pending = true
  Promise.resolve(result).finally(() => {
    pending = false
  })
}

const handleClick = (e: MouseEvent) => {
  const { loading, disabled, onClick } = props
  if (!onClick || loading || disabled || pending) return

  attemptAutoLoading(onClick(e))
}
</script>

<script lang="ts">
export default {
  name: 'MButton'
}
</script>

<style lang="scss">
@import './button.scss';
</style>
