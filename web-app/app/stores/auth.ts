import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    // Access token kept in memory (resets on page refresh)
    const accessToken = ref<string | null>(null)

    function setAccessToken(token: string) {
        accessToken.value = token
    }

    function clearAccessToken() {
        accessToken.value = null
    }

    return {
        accessToken,
        setAccessToken,
        clearAccessToken
    }
})
