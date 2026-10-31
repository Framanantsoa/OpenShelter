import { H3Event, createError, getHeader } from 'h3'
import jwt from 'jsonwebtoken'

interface JwtPayload {
    userId: number
    roleId: number
}

export function requireAuth(event: H3Event): JwtPayload {
    const authHeader = getHeader(event, 'authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw createError({
            statusCode: 401, statusMessage: 'Unauthorized: Missing or malformed access token',
        })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        throw createError({
            statusCode: 401, statusMessage: 'Unauthorized: Missing token string',
        })
    }
  
    const secret = process.env.JWT_ACCESS_SECRET || 'your-super-secret-key'

    try {
        const decoded = jwt.verify(token, secret) as unknown as JwtPayload
        return decoded // Returns the user ID and role ID embedded in the token
    } catch (error) {
        throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: Invalid or expired access token',
        })
    }
}
