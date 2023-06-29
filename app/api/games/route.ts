import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type Data = {
    name?: string;
    category?: number;
    price?: number;
}

export async function GET(req: NextRequest) {

    const games = await prisma.games.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            Categories: true,
            photo: true,
            price: true,
            stock: true
        }
    })

    return new NextResponse(JSON.stringify({
        result: games
    }))

}   