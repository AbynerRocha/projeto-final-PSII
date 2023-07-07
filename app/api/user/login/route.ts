import { prisma } from "@/prisma/prisma";
import { compareSync } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import env from "@/utils/env";


type Data = {
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    const { email, password }: Data = await req.json().catch((err) => {
        return new NextResponse(JSON.stringify({ error: err.message, message: 'Não foi possivel realizar está ação neste momento.'}))
    })

    const thisUserExists = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!thisUserExists) return new NextResponse(JSON.stringify({ error: 'USER_DOESNT_EXISTS', message: 'Este utilizador não está registado.' }), { status: 404 })
    if (!compareSync(password, thisUserExists.password)) return new NextResponse(JSON.stringify({ error: 'INVALID_PASSWORD', message: 'Senha Inválida' }), { status: 401 })

    const secretJWT = process.env.SECRET_JWT ?? env.SECRET_TOKEN

    const token = jwt.sign({
        id: thisUserExists.id,
        accessLevel: thisUserExists.accessLevel
    }, secretJWT, { expiresIn: '1d' })


    const res = NextResponse.next()
    const oneDayExpires = new Date(Date.now() + 86400*1000)

    res.cookies.set({
        name: env.COOKIES_PREFIXES.AUTH_TOKEN,
        value: token,
        expires: oneDayExpires
    })

    return new NextResponse(JSON.stringify({
        user: {
            id: thisUserExists.id,
            name: thisUserExists.name,
            email: thisUserExists.email,
            accessLevel: thisUserExists.accessLevel
        },
        token
    }), { status: 201 })
}