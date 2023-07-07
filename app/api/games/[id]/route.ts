import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    params: {
        id: string;
    }
}

export async function GET(req: NextRequest, { params }: Params) {
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

    if (game === null) return new NextResponse(JSON.stringify({ error: 'GAME_NOT_FOUND', message: 'Não foi possivel encontrar este jogo.' }), { status: 404 })

    return new NextResponse(JSON.stringify({
        game
    }), { status: 200 })

}

export async function PUT(req: NextRequest, { params }: Params) {
    const { searchParams } = new URL(decodeURI(req.url));

    const target = searchParams.get('t')
    const newData = searchParams.get('new')

    if (target === null || target !== 'title' && target !== 'description' && target !== 'category' && target !== 'price') return new NextResponse(JSON.stringify({
        error: 'TARGET_NOT_FOUND (' + target + ')',
        message: 'Houve um erro de comunicação com o servidor. Por favor tente mais tarde'
    }), { status: 400 })

    if (newData === null) return new NextResponse(JSON.stringify({
        error: 'MISSING_DATA',
        message: 'Houve um erro de comunicação com o servidor. Por favor tente mais tarde'
    }), { status: 400 })

    if (target === 'title') {
        prisma.games.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                name: newData
            }
        })

        const test = prisma.games.findUnique({ where: { id: parseInt(params.id) }})

        return new NextResponse(JSON.stringify({ test }), { status: 200 })
    } else if (target === 'description') {
        prisma.games.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                description: newData
            }
        })

        return new NextResponse(JSON.stringify({}), { status: 200 })
    } else if (target === 'category') {
        prisma.games.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                category: parseInt(newData)
            }
        })

        return new NextResponse(JSON.stringify({}), { status: 200 })
    } else if (target === 'price') {
        prisma.games.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                price: parseInt(newData)
            }
        })

        return new NextResponse(JSON.stringify({}), { status: 200 })
    }


    return new NextResponse() 
}

export async function DELETE(req: NextRequest, { params }: Params) {
    prisma.games.delete({
        where: {
            id: parseInt(params.id)
        }
    }).catch((err) => {
        return new NextResponse(JSON.stringify({ error: err.message, message: 'Não foi possivel realizar está ação.' }), { status: 500 })
    })

    return new NextResponse(JSON.stringify({}), { status: 200 })
}
