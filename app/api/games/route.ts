import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type Data = {
    name?: string;
    category?: number;
    price?: number;
}

export async function GET(req: NextRequest) {

    const games = await prisma.games.findMany()

    return new NextResponse(JSON.stringify({
        result: games
    }))

}   