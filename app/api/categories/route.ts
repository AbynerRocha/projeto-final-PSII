import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const categories = await prisma.categories.findMany()

    return new NextResponse(JSON.stringify({
        categories
    }), {
        status: 200
    })
}