<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue';

</script>

<template>
  <div class="flex min-h-screen flex-col bg-white font-sans text-slate-900 selection:bg-sky-500 selection:text-white">
    <AppHeader />

    <main class="flex-grow pt-16"><slot /></main>
  </div>
</template>
