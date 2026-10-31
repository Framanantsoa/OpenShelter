<script setup lang="ts">
// This locks down the page so only authenticated users can view it
definePageMeta({
    middleware: ['auth']
})
</script>

<template>
    <div>
        <h1>Protected Dashboard</h1>
    </div>
</template>
