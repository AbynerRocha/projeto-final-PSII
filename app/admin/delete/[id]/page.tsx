'use client'

import { GamesData } from '@/@types/games';
import Message from '@/components/Message';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useQuery } from 'react-query';
import { MoonLoader } from 'react-spinners';

type Params = {
    params: {
        id: number;
    }
}

export default function DeleteGame({ params }: Params) {
    const { id } = params

    const router = useRouter()

    const { data, isFetching, isError } = useQuery<GamesData>('getGameData', async () => {
        const res = await fetch('/api/games/' + id)
        const data = await res.json()

        return data.game
    })

    if (isFetching) return (
        <div className='bg-zinc-900 flex h-screen justify-center items-center'>
            <MoonLoader size={45} color='white' />
        </div>
    )

    if (isError || !data) return (
        <div className='bg-zinc-900 flex h-screen justify-center items-center'>
            <Message
                message='Não foi possivel realizar a consulta deste jogo.'
                variant='error'
            />
        </div>
    )

    async function handleDeleteGame() {
        const res = await fetch('/api/games/'+id, { method: 'DELETE' })

        if(res.status !== 200) return <Message variant='error' message='Occoreu um erro nesta ação, tente denovo mais tarde.' />

        router.push('/admin/')
    }

    return (
        <div className='h-screen bg-zinc-200 dark:bg-zinc-900'>
            <h1 className='text-center text-2xl font-semibold text-zinc-700 dark:text-zinc-100 uppercase mb-5'>Você realmente quer deletar este jogo?</h1>
            <div className='flex justify-center items-center'>
                <div className='flex justify-center items-center flex-col space-y-3'>
                    <div className='w-[200px] h-[250px] object-fill'>
                        <Image
                            src={data.photo}
                            alt={data.name}
                            width={200}
                            height={250}
                        />
                    </div>
                    <span className='text-lg font-semibold text-zinc-800 dark:text-zinc-100'>{data.name}</span>
                    <div className='space-x-3'>
                        <button onClick={handleDeleteGame} className='py-3 px-5 rounded-md font-semibold bg-red-600 text-zinc-100 hover:bg-red-500'>Sim</button>
                        <button    
                            className='py-3 px-5 rounded-md font-semibold bg-green-600 text-zinc-100 hover:bg-green-500'
                            onClick={() => {
                                router.back()  
                            }}
                        >
                            Não
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
