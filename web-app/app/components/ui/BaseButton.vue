<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  block?: boolean
}>(), { variant: 'primary', size: 'md', type: 'button' })

const variants = { primary: 'btn-primary', secondary: 'btn-outline', ghost: 'btn-ghost', danger: 'btn-error' }
const sizes = { sm: 'btn-sm', md: '', lg: 'btn-lg' }

const classes = computed(() => [
  'btn rounded-lg py-2',
  variants[props.variant],
  sizes[props.size],
  props.block && 'btn-block',
  (props.disabled || props.loading) && 'btn-disabled',
])
</script>

<template>
    <NuxtLink v-if="to" :to="to" :class="classes">
        <slot />
    </NuxtLink>
    
    <button v-else :type="type" :disabled="disabled || loading" :class="classes">
        <span v-if="loading" class="loading loading-spinner loading-sm" />
        <slot />
    </button>
</template>