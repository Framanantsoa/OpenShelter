import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore()

    // Try to silently fetch a new one access token
    if (!authStore.accessToken) {
        try {
            const response = await $fetch<{ accessToken: string }>('/api/refresh', { 
                method: 'POST' 
            })
            authStore.setAccessToken(response.accessToken)
        } catch (error) {
            // If refresh fails, the user has no valid session. Redirect to login.
            return navigateTo('/sign-in')
        }
    }
})
