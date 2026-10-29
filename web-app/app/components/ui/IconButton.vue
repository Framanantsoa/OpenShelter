<script setup lang="ts">
defineProps<{ icon: string; label: string }>()
</script>

<template>
    <button type="button" :aria-label="label"
     class="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 transition-colors
        hover:bg-slate-100 hover:text-slate-900
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
    >
        <Icon :name="icon" size="25" />
    </button>
</template>
