<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue';
import IconButton from '../ui/IconButton.vue';
import AppNav from './AppNav.vue';

defineProps<{ open: boolean; links: { label: string; to: string }[] }>()
</script>

<template>
    <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        leave-active-class="transition duration-150 ease-in"
        leave-to-class="opacity-0 -translate-y-2"
    >
        <div v-if="open" class="absolute inset-x-0 top-full flex flex-col gap-6 border-b border-slate-200 bg-white p-6 shadow-xl md:hidden">
            <AppNav :links="links" class="flex flex-col items-start! gap-4 text-base" />
            <BaseButton to="/sign-in" block>
                <Icon name="heroicons:arrow-right-end-on-rectangle" size="20" />
                Sign In
            </BaseButton>
        </div>
    </Transition>
</template>
