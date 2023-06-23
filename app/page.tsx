import Header from '@/components/Header'
import Product from '@/components/products'
import { auth as AuthContext } from '@/context/auth'
import { Games } from '@prisma/client'
import { GetServerSideProps } from 'next'
import React from 'react'

type Props = {
	games: Games[]
}


export default function Home() {
	const auth = AuthContext

	function getData() {
		const res = fetch('api/games')
		.catch((err) => {
			
		})
	}


	return (
		<div className='h-screen w-full bg-zinc-900 overflow-x-hidden'>
			<Header/>
			<main className=''>
				<div>
					<div className='ml-6 mb-4 flex flex-row space-x-3 items-center'>
						<div className='h-8 w-2 bg-zinc-700 rounded-lg' />
						<h3 className='text-zinc-100 font-semibold text-2xl '>Mais Vendidos 🚀</h3>
					</div>

					<div className='flex overflow-x-hidden hover:overflow-x-scroll py-3 space-x-8 mx-5 h-fit'>
						<Product
							name='Teste 1'
							description='teste'
							photo='https://upload.wikimedia.org/wikipedia/pt/thumb/8/80/Grand_Theft_Auto_V_capa.png/250px-Grand_Theft_Auto_V_capa.png'
							price={10} category="jogo"
						/>
						<Product
							name='Teste 2'
							description='teste'
							photo='https://image.api.playstation.com/cdn/UP0001/CUSA04459_00/qBxvfDJJ9dbavai6xsWOcWaxRDGRb7h0.png'
							price={10} category="jogo"
						/>
						<Product
							name='Teste 3'
							description='teste'
							photo='https://upload.wikimedia.org/wikipedia/pt/thumb/8/80/Grand_Theft_Auto_V_capa.png/250px-Grand_Theft_Auto_V_capa.png'
							price={10} category="jogo"
						/>
						<Product
							name='Teste 4'
							description='testeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
							photo='https://upload.wikimedia.org/wikipedia/pt/thumb/8/80/Grand_Theft_Auto_V_capa.png/250px-Grand_Theft_Auto_V_capa.png'
							price={10} category="jogo"
						/>
						<Product
							name='Teste 4'
							description='testeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
							photo='https://upload.wikimedia.org/wikipedia/pt/thumb/8/80/Grand_Theft_Auto_V_capa.png/250px-Grand_Theft_Auto_V_capa.png'
							price={10} category="jogo"
						/>

					</div>
				</div>
			</main>
		</div>
	)
}
