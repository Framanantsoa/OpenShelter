<script setup lang="ts">
import type { NuxtError } from '#app'
import BaseButton from './components/ui/BaseButton.vue';

const props = defineProps<{ error: NuxtError }>()

type ErrorContent = {
  title: string
  text: string
  icon: string
}

const notFound: ErrorContent = {
  title: 'Page not found',
  text: "The page you're looking for doesn't exist or has moved.",
  icon: 'heroicons:map',
}

const serverError: ErrorContent = {
  title: 'Something went wrong',
  text: "We're having a problem on our side. Please try again in a moment.",
  icon: 'heroicons:exclamation-triangle',
}

const content: Record<number, ErrorContent> = {
  401: {
    title: 'Sign in required',
    text: 'Please sign in to continue.',
    icon: 'heroicons:lock-closed',
  },
  403: {
    title: 'Access denied',
    text: "You don't have permission to view this page.",
    icon: 'heroicons:no-symbol',
  },
  404: notFound,
  500: serverError,
}

const status = computed(() => props.error.status ?? 500)

const current = computed<ErrorContent>(
  () => content[status.value] ?? (status.value >= 500 ? serverError : notFound),
)

useSeoMeta({ title: () => `${status.value} · ${current.value.title}`, robots: 'noindex' })

const goHome = () => clearError({ redirect: '/' })
const retry = () => reloadNuxtApp()
</script>

<template>
    <NuxtLayout>
        <section class="flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 py-16">
            <div class="max-w-lg text-center">
                <Icon :name="current.icon" size="56" class="text-primary" />
                <p class="mt-4 text-7xl font-extrabold tracking-tight text-slate-900">{{ status }}</p>
                <h1 class="mt-2 text-2xl font-bold text-slate-900">{{ current.title }}</h1>
                <p class="mt-3 text-slate-600">{{ current.text }}</p>

                <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <BaseButton v-if="status === 401" to="/sign-in" icon="heroicons:arrow-right-end-on-rectangle">
                        Sign in
                    </BaseButton>
                    <BaseButton v-else-if="status >= 500" icon="heroicons:arrow-path" @click="retry">
                        Try again
                    </BaseButton>

                    <BaseButton variant="secondary" @click="goHome">Back to home</BaseButton>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>
