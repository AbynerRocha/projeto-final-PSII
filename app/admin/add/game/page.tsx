'use client'

import Input from '@/components/Input'
import Message from '@/components/Message'
import { Categories, Games } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function AddGame() {
    const router = useRouter()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [initialStock, setInitialStock] = useState(0)
    const [category, setCategory] = useState(0)
    const [categories, setCategories] = useState<Categories[]>([])
    const [error, setError] = useState({ error: '', targetError: '' })

    useEffect(() => {
        getAllCategories()
    }, [])

    async function getAllCategories() {
        const res = await fetch('/api/categories/', { method: 'GET' })
        const data = await res.json()

        setCategories(data.categories)
    }

    async function handleSubmit() {
        
        if(name === '') {
            setError({
                error: 'Este campo é obrigatório.',
                targetError: 'name'
            })
            return
        } else if(description === '') {
            setError({
                error: 'Este campo é obrigatório.',
                targetError: 'description'
            })
            return
        } else if(category === 0) {
            setError({
                error: 'Este campo é obrigatório.',
                targetError: 'category'
            })
            return
        } else if(price === 0) {
            setError({
                error: 'Este campo é obrigatório.',
                targetError: 'price'
            })
            return
        } else if(initialStock === 0) {
            setError({
                error: 'Este campo é obrigatório.',
                targetError: 'initialStock'
            })
            return
        }


        fetch('/api/games/add', {
            method: 'POST',
            body: JSON.stringify({
                name,
                description,
                categoryId: category,
                price,
                initialStock
            })
        })
            .then((res) => res.json())
            .then((data: { gameInserted?: Games; error?: string; message?: string; }) => {
                if (data.gameInserted) {
                    router.push('/admin/')
                    return
                }

                if (data.error && data.message) {
                    setError({
                        error: data.message,
                        targetError: 'message'
                    })
                    return
                }
            })
            .catch((err) => {
                console.log(err);

            })
            .catch((err) => {
                setError({
                    error: err.message,
                    targetError: 'message'
                })
            })

    }


    return (
        <div className=''>
            <div className='flex justify-center items-center flex-col text-zinc-100'>
                <h1 className='text-zinc-100 text-2xl font-semibold mb-3'>Adicionar Jogo</h1>
                <form className='flex flex-col w-1/5 space-y-3' onSubmit={(e) => {
                    e.preventDefault()

                    handleSubmit()
                }}>
                    <div className='flex flex-col space-y-2 max-w-full break-words'>
                        <label htmlFor="" className='text-sm'>Nome</label>
                        <Input
                            variant={error.targetError === 'name' ? 'error' : 'normal'}
                            placeholder='Digite aqui'
                            type='text'
                            onChange={({ target: { value } }) => setName(value)}
                        />
                        {error.targetError === 'name' ? <p className='text-sm text-red-400'>{error.error}</p> : false}
                    </div>
                    <div className='flex flex-col space-y-2 max-w-full break-words'>
                        <label htmlFor="" className='text-sm'>Descrição</label>
                        <textarea
                            className={error.targetError === 'description'
                                ? 'p-3 rounded-md bg-zinc-700 focus:outline-none focus:bg-zinc-600 border border-red-500 hover:bg-zinc-600 focus:border-red-500 placeholder:text-sm placeholder:text-red-400'
                                : 'p-3 rounded-md bg-zinc-700 focus:outline-none focus:bg-zinc-600 border border-zinc-700 hover:bg-zinc-600 focus:border-zinc-500 placeholder:text-sm placeholder:text-zinc-400'}
                            placeholder='Digite aqui'
                            onChange={({ target: { value } }) => setDescription(value)}
                        />
                        {error.targetError === 'description' ? <p className='text-sm text-red-400'>{error.error}</p> : false}

                    </div>
                    <div className='flex flex-col space-y-2 max-w-full break-words'>
                        <label htmlFor="" className='text-sm'>Preço</label>
                        <Input
                            variant={error.targetError === 'price' ? 'error' : 'normal'}
                            placeholder='Digite aqui'
                            type='number'
                            onChange={({ target: { value } }) => {
                                setPrice(parseInt(value))
                            }}
                        />
                        {error.targetError === 'price' ? <p className='text-sm text-red-400'>{error.error}</p> : false}

                    </div>
                    <div className='flex flex-col space-y-2 max-w-full break-words'>
                        <label htmlFor="" className='text-sm'>Estoque inicial</label>
                        <Input
                            variant={error.targetError === 'initialStock' ? 'error' : 'normal'}
                            placeholder='Digite aqui'
                            type='number'
                            onChange={({ target: { value } }) => {
                                setInitialStock(parseInt(value))
                            }}
                        />

                        {error.targetError === 'initialStock' ? <p className='text-sm text-red-400'>{error.error}</p> : false}

                    </div>

                    <div className='flex flex-col space-y-2 max-w-full break-words'>
                        <label htmlFor="" className='text-sm'>Categoria</label>
                        <select
                            onChange={({ target: { value } }) => {
                                setCategory(parseInt(value))
                            }}
                            defaultValue={0}
                            className={error.targetError === 'category'
                                ? 'bg-zinc-700 border-none p-3 rounded-md text-red-400 focus:outline-red-500 hover:bg-zinc-600 border border-red-500 focus:border-red-500 placeholder:text-red-400'
                                : 'bg-zinc-700 border-none p-3 rounded-md text-zinc-200 focus:outline-none hover:bg-zinc-600 border border-zinc-700 focus:border-zinc-500'}
                        >
                            <option value={0}>Selecione uma categoria</option>

                            {categories.length > 0 && categories.map((kgory, idx) => {
                                return <option key={idx} value={kgory.id}>{kgory.name}</option>
                            })}
                        </select>
                        {error.targetError === 'category' ? <p className='text-sm text-red-400'>{error.error}</p> : false}

                    </div>

                    <div>
                        <button
                            className='bg-green-500 p-3 rounded-md hover:bg-green-600 w-full mt-2 text-zinc-950 font-semibold'
                            type='submit'
                        >
                            Adicionar
                        </button>
                    </div>
                    {error.targetError === 'message' ? <Message
                        variant='error'
                        message={error.error}
                    /> : false}
                </form>
            </div>
        </div>
    )
}
/*

    

*/