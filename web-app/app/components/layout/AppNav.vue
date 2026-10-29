<script setup lang="ts">
defineProps<{ links: { label: string; to: string }[] }>()
</script>

<template>
  <nav class="items-center gap-8 text-sm font-semibold text-slate-600">
    <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="transition-colors hover:text-sky-600">
      {{ l.label }}
    </NuxtLink>
  </nav>
</template>
