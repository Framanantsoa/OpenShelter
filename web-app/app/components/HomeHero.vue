<script setup lang="ts">
import BaseButton from './ui/BaseButton.vue'

const features = [
    { icon: 'heroicons:map-pin', title: 'Live map', text: 'Real-time status & routes' },
    { icon: 'heroicons:signal-slash', title: 'Offline PWA', text: 'Works without signal' },
    { icon: 'heroicons:archive-box', title: 'Supplies', text: 'Capacity & item tracking' },
]
</script>

<template>
    <section class="hero relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-neutral">
        <NuxtImg
            src="/images/comm.jpg"
            alt="Volunteers setting up cots at an emergency shelter"
            width="1920"
            loading="eager"
            fetchpriority="high"
            class="absolute inset-0 -z-10 h-full w-full object-cover"
            format="webp" quality="75"
            preload
        />
        <div
            class="hero-overlay bg-transparent bg-gradient-to-r from-neutral/80 via-neutral/70 to-neutral/60
            lg:from-neutral/90 lg:via-neutral/60 lg:to-transparent"
        />

        <div class="hero-content w-full max-w-none justify-start px-4 py-16 sm:px-6 lg:px-8">
        <div class="max-w-5xl space-y-8">
            <StatusPill dark>Community Crisis Platform</StatusPill>

            <h1 class="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Locate shelter.
                <br />
                <span class="bg-gradient-to-r from-sky-300 to-cyan-200 bg-clip-text text-transparent">
                    Save lives in crisis.
                </span>
            </h1>

            <p class="max-w-3xl text-lg leading-relaxed text-slate-100 sm:text-xl lg:text-2xl">
                A real-time community platform to locate emergency shelters, track live capacity and vital
                supplies, and coordinate volunteer teams during emergencies.
            </p>

            <div class="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <BaseButton to="/#map" size="lg">Find Open Shelters</BaseButton>
            </div>

            <ul class="grid max-w-xl grid-cols-1 gap-4 border-t border-white/25 pt-8 sm:grid-cols-3">
                <li v-for="f in features" :key="f.title" class="flex items-start gap-3">
                    <Icon :name="f.icon" size="24" class="mt-0.5 shrink-0 text-sky-300" />
                    
                    <div>
                        <p class="font-bold text-white">{{ f.title }}</p>
                        <p class="text-sm text-slate-200">{{ f.text }}</p>
                    </div>
                </li>
            </ul>
        </div>
        </div>
    </section>
</template>
