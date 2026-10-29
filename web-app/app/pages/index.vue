<script setup lang="ts">
import HomeHero from '~/components/HomeHero.vue';
const url = useRequestURL();

useSeoMeta({
  title: 'Real-Time Emergency Shelter & Resource Coordination',
  description: 'Find open emergency shelters, check live capacity and supplies, and coordinate volunteers.',
  ogImage: `${url.origin}/images/og-comm.jpg`, // 1200×630 crop of the same photo
})
</script>

<template>
  <HomeHero />
</template>
