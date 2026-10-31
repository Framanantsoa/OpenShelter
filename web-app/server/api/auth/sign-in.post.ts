import { signInSchema } from '#shared/schemas/auth'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { db } from '~~/server/db'
import { refreshTokens, users } from '~~/server/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

function verifyPassword(suppliedPassword: string, storedHash: string): boolean {
    try {
        const [salt, key] = storedHash.split(':')
        if (!salt || !key) return false
        const hashedBuffer = crypto.scryptSync(suppliedPassword, salt, 64)
        const keyBuffer = Buffer.from(key, 'hex')
        return crypto.timingSafeEqual(hashedBuffer, keyBuffer)
    } catch {
        return false
    }
}

function raiseInvalidInformations():void {
    throw createError({ 
        statusCode: 401, statusMessage: 'Invalid user name or password' 
    })
}

export default defineEventHandler(async (event) => {
    // 1. Read and parse the incoming request body
    const body = await readBody(event)
    
    // 2. Validate data against Zod schema
    const result = signInSchema.safeParse(body)
    if (!result.success) {
        throw createError({ 
            statusCode: 422, statusMessage: 'Validation Error', data: result.error.issues
        })
    }
    const { nickName, password } = result.data

    // 3. Find user by nickName in PostgreSQL via Drizzle
    const user = await db.query.users.findFirst({
        where: eq(users.nickName, nickName),
    })
    if (!user) { raiseInvalidInformations() }

    // 4. Verify password using native crypto
    const isPasswordValid = await bcrypt.compare(password, user!.password)
    if (!isPasswordValid) { raiseInvalidInformations() }

    const userId = user!.id
    const roleId = user!.roleId

    // 5. Generate a short-lived Access Token (15 minutes) for Pinia memory
    const accessSecret = process.env.JWT_ACCESS_SECRET || 'your-super-secret-key'
    const accessToken = jwt.sign(
        { userId, roleId }, 
        accessSecret,
        { expiresIn: '15m' }
    )

    // 6. Generate a secure random Refresh Token (7 days validity)
    const rawRefreshToken = crypto.randomBytes(64).toString('hex')
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now

    // 7. Save the refresh token in PostgreSQL
    await db.insert(refreshTokens).values({
        userId: userId,
        tokenHash: rawRefreshToken,
        isRevoked: false,
        expiresAt: expiresAt,
    })

    // 8. Store the Refresh Token securely in an HttpOnly Cookie
    setCookie(event, 'refreshToken', rawRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
        path: '/',
    })

    // 9. Return the access token so the frontend Pinia store can catch it
    return {
        success: true,
        message: 'Signed in successfully',
        accessToken, 
    }
})
