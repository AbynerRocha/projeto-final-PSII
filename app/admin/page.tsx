'use client'

import { Games } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { MoonLoader } from 'react-spinners'
import { FiSearch } from 'react-icons/fi'

export default function Admin() {
    const [games, setGames] = useState<Games[]>([])
    const [search, setSearch] = useState<Games[]>([])

    useEffect(() => {
        getGames()
    }, [])

    const { isFetching } = useQuery('getGames', getGames)

    async function getGames() {
        const res = await fetch('/api/games', {
            method: 'GET',
            headers: {
                append: 'Access-Control-Allow-Origin'
            }
        })
        const data = await res.json()

        setGames(data.result)
        return data
    }

    if(isFetching) return (
        <div className='flex flex-1 h-screen justify-center items-center'>
            <MoonLoader size={45} color='white' />
        </div>
    )
    return (
        <div className='bg-zinc-900 h-screen'>
            <div className='my-5 flex items-end justify-between'>
                <Link 
                    href={'/admin/add/game'}
                    className='bg-green-500 text-zinc-100 p-3 rounded-md ml-3 hover:bg-green-600'
                >
                    Adicionar
                </Link>

                <div className='rounded-md mr-3 py-2 px-3 bg-zinc-700 border border-zinc-900 text-zinc-100 flex items-center justify-center hover:bg-zinc-600'>
                    <input
                        className=' border-none  bg-transparent focus:outline-none'
                        type="text"
                        placeholder='Pesquisar'
                        onChange={({ target: { value }}) => {
                            const searchData = games.filter(item => item.name.includes(value))
                            console.log(searchData);
                            
                            setSearch(searchData)
                        }}
                    />  
                </div>
            </div>

            <div className='relative overflow-x-auto sm:rounded-lg mx-3'>
                <table className='w-full text-sm text-left text-gray-500'>
                    <thead className='text-xs text-gray-400 uppercase bg-gray-700 p-3'>
                        <tr>
                            <th className="px-6 py-3 border-r border-gray-600">ID</th>
                            <th className="px-6 py-3 border-r border-gray-600">Nome</th>
                            <th className="px-6 py-3 border-r border-gray-600">Descrição</th>
                            <th className="px-6 py-3 border-r border-gray-600">Preço</th>
                            <th className="px-6 py-3 border-r border-gray-600">Stock</th>
                            <th className="px-6 py-3 border-r border-gray-600">Categoria</th>
                            <th className="px-6 py-3 border-r border-gray-600"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {search.length === 0 ? games.length > 0 && games.map((game, idx) => {
                            return (
                                <tr key={idx} className='border-b border-gray-700 hover:bg-gray-600 '>
                                    <td className='px-6 py-4 font-medium whitespace-nowrap text-white'>{game.id}</td>
                                    <td className='px-6 py-4 font-medium whitespace-nowrap text-white'>{game.name}</td>
                                    <td>{game.description.slice(0, 80) + '...'}</td>
                                    <td>{game.price} €</td>
                                    <td>{game.stock} und.</td>
                                    <td>{game.category}</td>
                                    <td><Link className='text-blue-400 text-md font-semibold' href={'admin/gerir?id='+game.id}>Gerir</Link></td>
                                </tr>
                            )
                        }) : search.map((game, idx) => {
                            return (
                                <tr key={idx} className='border-b border-gray-700 hover:bg-gray-600 '>
                                    <td className='px-6 py-4 font-medium whitespace-nowrap text-white'>{game.id}</td>
                                    <td className='px-6 py-4 font-medium whitespace-nowrap text-white'>{game.name}</td>
                                    <td>{game.description.slice(0, 80) + '...'}</td>
                                    <td>{game.price} €</td>
                                    <td>{game.stock} und.</td>
                                    <td>{game.category}</td>
                                    <td><Link className='text-blue-400 text-md font-semibold' href={'admin/gerir?id='+game.id}>Gerir</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>


        </div>

    )
}

/*


<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
                <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                    Black
                </td>
                <td className="px-6 py-4">
                    Accessories
                </td>
                <td className="px-6 py-4">
                    $99
                </td>
                <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>


 */
