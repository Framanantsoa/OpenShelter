<script setup lang="ts">
defineProps<{ dark?: boolean }>()
</script>

<template>
    <div :class="[
        'px-2 badge badge-lg gap-2 font-bold rounded-lg',
        dark ? 'border-white/30 bg-white/15 text-white backdrop-blur-sm' : 'badge-soft badge-info',
    ]">
        <!-- Status Dot with Ping Animation -->
        <span class="relative flex items-center justify-center rounded-full" aria-hidden="true">
            <span class="status status-success status-lg rounded-full absolute motion-safe:animate-ping" />
            <span class="status status-success status-md rounded-full" />
        </span>
        
        <slot />
    </div>
</template> 
