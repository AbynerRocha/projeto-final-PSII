import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type Data = {
    name?: string;
    category?: number;
    price?: number;
}

export async function GET(req: NextRequest, { params }: { params: { id: string; }}) {
    const id = parseInt(params.id)

    const game = await prisma.games.findUnique({
        where: {
            id
        },
        select: {
            name: true,
            description: true,
            photo: true,
            price: true,
            stock: true,
            Categories: true
        }
    })

    if(game === null) return new NextResponse(JSON.stringify({ error: 'GAME_NOT_FOUND', message: 'Não foi possivel encontrar este jogo.' }), { status: 404 })

    return new NextResponse(JSON.stringify({
        game
    }), { status: 200 })

}   