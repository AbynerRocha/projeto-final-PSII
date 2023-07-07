import { NextRequest, NextResponse } from "next/server";
import jwt, { JsonWebTokenError, Jwt } from 'jsonwebtoken'
import env from "@/utils/env";
import { prisma } from "@/prisma/prisma";
import { decodeTokenData, thisTokenIsExpired } from "@/utils/jwt/jwt";

export async function GET(req: NextRequest) {
    const res = NextResponse.next()

    const { searchParams } = new URL(req.url)
    const token = searchParams.get('t')

    if (!token) return new NextResponse(JSON.stringify({ error: 'MISSING_DATA', message: 'Não foi possivel realizar está ação.' }))

    const secret = process.env.TOKEN ?? env.SECRET_TOKEN

    try {
        jwt.verify(token, secret, { complete: true })

        if (thisTokenIsExpired(token)) {
            res.cookies.delete(env.COOKIES_PREFIXES.AUTH_TOKEN)

            return new NextResponse(JSON.stringify({
                error: 'TOKEN_EXPIRED',
                message: 'A sua sessão expirou.'
            }))
        }

        const decoded = decodeTokenData(token)
        if (decoded === null) return new NextResponse(JSON.stringify({}), { status: 400 })
        if (typeof decoded === 'string') throw new Error('Invalid Token')

        const user = await prisma.user.findUnique({ where: { id: decoded.id } })

        if (!user) return new NextResponse(JSON.stringify({
            error: 'USER_NOT_FOUND',
            message: 'Não foi possivel encontrar este utilizador'
        }), { status: 404 })


        const newToken = jwt.sign({
            id: decoded.id,
            accessLevel: decoded.accessLevel
        }, secret, { expiresIn: '1d' })
        const oneDayExpires = new Date(Date.now() + 86400 * 1000)

        if (req.cookies.get(env.COOKIES_PREFIXES.AUTH_TOKEN)) {
            res.cookies.delete(env.COOKIES_PREFIXES.AUTH_TOKEN)
        }

        res.cookies.set({
            name: env.COOKIES_PREFIXES.AUTH_TOKEN,
            value: newToken,
            expires: oneDayExpires
        })

        return new NextResponse(JSON.stringify({
            user,
            newToken
        }), { status: 200 })

    } catch (error: any) {
        if (req.cookies.get(env.COOKIES_PREFIXES.AUTH_TOKEN)) {
            res.cookies.delete(env.COOKIES_PREFIXES.AUTH_TOKEN)
        }
        JsonWebTokenError
        return new NextResponse(JSON.stringify({
            error,
            message: 'Ocorreu um erro, e não foi possivel realizar está ação',
        }), { status: 400 })
    }
}