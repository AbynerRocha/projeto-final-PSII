import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export function GET(req: NextRequest) {
    const users = prisma.user.findMany()

    return new NextResponse(JSON.stringify({ result: users }), { status: 200 })
}

// Registrar

type Data = {
    name: string;
    password: string;
    email: string;
}

export async function POST(req: NextRequest) {
    const { name, password, email }: Data = await req.json()

    if (!name || !password || !email) return new NextResponse(JSON.stringify({
        error: 'MISSING_DATA',
        message: 'Ocorreu um erro no lado do servidor. Tente novamente mais tarde, por favor.'
    }))

    const hashPass = bcrypt.hashSync(password, 10)
    const thisUserExists = await prisma.user.findUnique({ where: { email } })

    if(thisUserExists) return new NextResponse(JSON.stringify({ error: 'USER_ALREADY_EXISTS', message: 'Este utilizador já está registado.' }), { status: 400 })

    const registeredUser = await prisma.user.create({
        data: {
            name,
            password: hashPass,
            email
        }
    })

    return new NextResponse(JSON.stringify({ user: registeredUser }), { status: 201 })    
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.nextUrl)
    const userId = parseInt(searchParams.get('u') ?? '')

    if(userId <= 0) return new NextResponse(JSON.stringify({
        error: 'INVALID_ID',
        message: 'Ocorreu um erro no lado do servidor, tente mais tarde por favor.'
    }), { status: 400 })


    const thisUserExists = await prisma.user.findUnique({ where: { id: userId }})

    if(!thisUserExists) return new NextResponse(JSON.stringify({
        error: 'THIS_USER_DOESNT_EXIST',
        message: 'Ocorreu um erro no lado do servidor, tente mais tarde por favor.'
    }), { status: 404 })


    prisma.user.delete({ where: { id: userId }})

    return new NextResponse(JSON.stringify({}), { status: 200 })
}