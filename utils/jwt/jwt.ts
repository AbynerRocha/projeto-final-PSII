import jwt from 'jsonwebtoken'

export function thisTokenIsExpired(token: string) {
    const decoded = jwt.decode(token)

    if(decoded === null || typeof decoded === 'string') throw new Error('Invalid token')

    const { exp } = decoded
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if(!exp) return true
    if(exp < currentTimestamp) return true

    return false
}

export function decodeTokenData(token: string) {
    const decoded = jwt.decode(token)

    if(decoded === null || typeof decoded === 'string') throw new Error('Invalid token')
    
    return decoded
}