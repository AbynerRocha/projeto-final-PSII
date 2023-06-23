import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type Data = {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    initialStock: number;
}

export async function POST(req: NextRequest) {
    const { name, description, price, categoryId, initialStock }: Data = await req.json()

    if (!name || !description || !price || !categoryId || !initialStock || typeof price !== "number" || typeof categoryId !== "number")
        return new NextResponse(JSON.stringify({
            message: 'Não foi possivel realizar está ação.',
            error: 'MISSING_DATA'
        }), { status: 400 })

    const thisGameIsAlreadyRegistered = await prisma.games.findFirst({
        where: {
            name
        }
    })

    if(thisGameIsAlreadyRegistered) return new NextResponse(JSON.stringify({ 
        message: 'Já existe um jogo com este nome.',
        error: 'GAME_ALREADY_EXISTS' 
    }), { status: 400 })

    const gameInserted = await prisma.games.create({
        data: {
            name, 
            price,
            description,
            photo: 'https://upload.wikimedia.org/wikipedia/pt/thumb/8/80/Grand_Theft_Auto_V_capa.png/250px-Grand_Theft_Auto_V_capa.png',
            category: categoryId,
        }
    })    

    return new NextResponse(JSON.stringify({
        gameInserted
    }), {
        status: 201
    })
}