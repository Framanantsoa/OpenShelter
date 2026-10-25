import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

let connectionString: string

try {
    const config = useRuntimeConfig()
    connectionString = config.databaseUrl
} catch {
    connectionString = process.env.DATABASE_URL || process.env.NUXT_DATABASE_URL || ''
}

if (!connectionString) {
    throw new Error('Database URL is missing. Check your runtime config or .env files.')
}

// Initialize postgres client
export const client = postgres(connectionString)

// Export the Drizzle instance for your server routes
export const db = drizzle(client)
