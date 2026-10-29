<script setup lang="ts">
import { useNavLinks } from '~/composables/useNavLinks';
import AppLogo from './AppLogo.vue';
import AppNav from './AppNav.vue';
import BaseButton from '../ui/BaseButton.vue';
import IconButton from '../ui/IconButton.vue';
import MobileMenu from './MobileMenu.vue';

const links = useNavLinks();
const open = ref(false);
const route = useRoute();

watch(() => 
  route.fullPath, () => (open.value = false)
);
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-20 border-b border-slate-200/80 bg-white/95 shadow-sm md:bg-white/80 md:backdrop-blur-md">
    <div class="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
      <AppLogo />
      <AppNav :links="links" class="hidden md:flex" />

      <div class="hidden items-center gap-3 md:flex">
        <BaseButton to="/#locator">Find Shelter Now</BaseButton>
      </div>

      <IconButton
        class="md:hidden"
        :icon="open ? 'heroicons:x-mark' : 'heroicons:bars-3'"
        :label="open ? 'Close navigation menu' : 'Open navigation menu'"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        @click="open = !open"
      />
    </div>

    <MobileMenu id="mobile-menu" :open="open" :links="links" />
  </header>
</template>
