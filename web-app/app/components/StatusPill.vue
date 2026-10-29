<script setup lang="ts">
defineProps<{ dark?: boolean }>()
</script>

<template>
    <div :class="[
        'badge badge-lg gap-2 font-bold',
        dark ? 'border-white/30 bg-white/15 text-white backdrop-blur-sm' : 'badge-soft badge-info',
    ]">
        <span class="inline-grid *:[grid-area:1/1]" aria-hidden="true">
            <span class="status status-success motion-safe:animate-ping" />
            <span class="status status-success" />
        </span>
        
        <slot />
    </div>
</template>
