import { defineEventHandler, createError } from 'h3'
import { eq, and, gt } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { db } from '../db'
import { refreshTokens } from '../db/schema'

export default defineEventHandler(async (event) => {
    // 1. Read the refresh token from the HttpOnly cookie sent by the browser
    const cookies = parseCookies(event)
    const refreshToken = cookies.refreshToken

    if (!refreshToken) {
        throw createError({
            statusCode: 401, statusMessage: 'Unauthorized: No refresh token provided',
        })
    }

    try {
        // 2. Query the database to find the token
        const storedTokenRecord = await db.query.refreshTokens.findFirst({
            where: and(
                eq(refreshTokens.tokenHash, refreshToken),
                eq(refreshTokens.isRevoked, false),
                gt(refreshTokens.expiresAt, new Date()) // Ensure it hasn't expired
            ),
            with: {
                user: true, // Fetch associated user data if needed
            },
        })

        if (!storedTokenRecord) {
            throw createError({
                statusCode: 403, statusMessage: 'Forbidden: Invalid or expired refresh token',
            })
        }

        const user = storedTokenRecord.user

        // 3. Generate a new short-lived Access Token (15 minutes)
        const secret = process.env.JWT_ACCESS_SECRET || 'your-super-secret-key'
        const accessToken = jwt.sign(
            { userId: user.id, roleId: user.roleId }, secret, 
            { expiresIn: '15m' }
        )
        
        // 4. Return the new access token to the client
        return { accessToken }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500, statusMessage: error.statusMessage
             || 'Internal Server Error during token refresh',
        })
    }
})
