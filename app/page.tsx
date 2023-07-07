'use client'

import { GamesData } from '@/@types/games'
import Message from '@/components/Message'
import Product from '@/components/products'
import { useAuth } from '@/context/auth'
import React from 'react'
import { useQuery } from 'react-query'
import { MoonLoader } from 'react-spinners'


export default function Home() {
	const auth = useAuth()

	const { data, isFetching, isError } = useQuery<GamesData[]>('getGames', async () => {
		const res = await fetch('/api/games/')
		
		if(res.status !== 200) throw new Error('Erro no lado do servidor.')

		const data = await res.json()

		return data.result
	})

	if(isFetching) return (
        <div className='bg-zinc-900 flex h-screen justify-center items-center'>
            <MoonLoader size={45} color='white' />
        </div>
    )

	if(isError) return (
		<div className='bg-zinc-900 flex h-screen justify-center items-center'>
            <Message
				variant='error'
				message='Ocorreu um erro, não foi possivel realizar a consulta.'
			/>
        </div>
	)
	
	return (
		<div className='bg-zinc-900 h-screen w-full overflow-x-hidden'>
			<main className=''>
				<div>
					<div className='ml-6 mb-4 flex flex-row space-x-3 items-center'>
						<div className='h-8 w-2 bg-green-400 rounded-lg' />
						<h3 className='text-zinc-100 font-semibold text-2xl '>Mais Vendidos 🚀</h3>
					</div>

					<div className='flex overflow-x-hidden hover:overflow-x-auto py-3 space-x-8 mx-5 h-fit'>
						{data && data.length > 0 && data.slice(0, 4).map((game, idx) => {
							return (
								<Product
									key={idx}
									name={game.name}
									description={game.description}
									category={game.Categories.name}
									price={game.price}
									photo={game.photo}
								/>
							)
						})}
					</div>
				</div>
			</main>
		</div>
	)
}
