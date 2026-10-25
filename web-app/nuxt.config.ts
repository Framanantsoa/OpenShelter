// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  vite: {
    plugins: [tailwindcss() as any],
  },
  css: ['./app/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL
  }
})
