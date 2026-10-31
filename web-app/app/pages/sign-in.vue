<script setup lang="ts">
import { signInSchema } from '#shared/schemas/auth'
import BaseButton from '~/components/ui/BaseButton.vue'
import FormInput from '~/components/ui/FormInput.vue'

useSeoMeta({ title: 'Sign in', robots: 'noindex' })

const { values, errors, formError, submitting, submit } = useForm(
  signInSchema, { nickName: '', password: '' },
  async (data) => {
    try {
      const authStore = useAuthStore()

      const response = await $fetch<{ accessToken: string }>('/api/auth/sign-in', { 
        method: 'POST', body: data 
      })
      // Save access token to Pinia memory
      authStore.setAccessToken(response.accessToken)

      await navigateTo('/protected')
    }
    catch(err: any) {
      if (err.statusCode === 422) {
        // Extract validation issues returned in createError data
        const issues = err.data?.data || []
        
        // Safely map issues to specific fields with string casting
        issues.forEach((issue: any) => {
          const field = String(issue.path[0])
          if (field) {
            errors.value[field] = issue.message
          }
        })
      }
      else if (err.statusCode === 401) {
        // Set a general alert notification for the card
        formError.value = err.statusMessage || 'Invalid user name or password'
      }
      else {
        throw err // Re-throw unhandled errors so useForm catches them
      }
    }
  },
)
</script>

<template>
  <section class="flex min-h-[calc(100svh-4rem)] items-center justify-center bg-base-200 px-4 py-16">
    <form class="card w-full max-w-xl py-3 border border-base-300 bg-base-100 rounded-sm shadow-xl" novalidate
      @submit.prevent="submit"
    >
      <div class="card-body gap-8">
        <!-- Centered Header with Users Icon -->
        <div class="flex flex-col items-center justify-center gap-2 text-center">
          <div class="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon name="heroicons:users" size="40" />
          </div>
          <h1 class="card-title text-2xl text-base-content">Sign In to OpenShelter</h1>
        </div>

        <div v-if="formError" role="alert" class="alert alert-error alert-soft">
          {{ formError }}
        </div>

        <FormInput id="nickName" v-model="values.nickName"
          label="User name"
          type="text"
          autocomplete="text"
          :error="errors.nickName"
        />
        <FormInput id="password" v-model="values.password"
          label="Password"
          type="password"
          autocomplete="current-password"
          :error="errors.password"
        />

        <BaseButton type="submit" :loading="submitting" block>Sign In</BaseButton>
      </div>
    </form>
  </section>
</template>
