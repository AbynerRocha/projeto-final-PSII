'use client'

import { GamesData } from '@/@types/games';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import Message from '@/components/Message';
import Image from 'next/image';
import { useState } from 'react'
import { BiCheck, BiPencil, BiX } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { MoonLoader } from 'react-spinners';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type EditData = {
    toData: '' | 'title' | 'description' | 'price' | 'category';
    oldData: any;
    newData: any;
}

export default function Gerir({ params }: { params: { id: number; } }) {
    const { id } = params

    const router = useRouter()

    const [edit, setEdit] = useState<EditData>({
        toData: '',
        oldData: '',
        newData: ''
    })

    const [error, setError] = useState({
        message: '',
        target: ''
    })

    const { data, isFetching, isError, refetch } = useQuery<GamesData>('getGameData', async () => {
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

    async function handleEditGame() {
        if (edit.newData === '' || edit.toData === '') return setEdit({ toData: '', oldData: '', newData: '' })
        if (edit.newData === edit.oldData) return setEdit({ toData: '', oldData: '', newData: '' })

        const res = await fetch(encodeURI('/api/games/' + id + '?t=' + edit.toData + '&new=' + edit.newData), {
            method: 'PUT'
        })

        const data = await res.json()

        if (data.error) {
            setError({
                message: data.message,
                target: 'message'
            })
            setEdit({ toData: '', oldData: '', newData: '' })
            return
        }

        router.prefetch('/admin/')
        router.replace('/admin/')
    }

    return (
        <div className='text-zinc-100'>
            <div className='flex flex-row'>
                <div className='w-72 h-64 object-fill ml-7 mt-5'>
                    <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
                        <Image
                            src={data.photo}
                            width={300}
                            height={250}
                            alt={data.name + ' photo'}
                            onLoad={() => {
                                return <MoonLoader size={25} color='white' />
                            }}
                            className='hover:bg-grey-600'
                        />
                        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full cursor-pointer overflow-hidden bg-zinc-800 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-30">

                        </div>
                    </div>
                </div>
                <div className='max-w-xl break-words space-y-2'>

                    {edit.toData === 'title'
                        ? <div className='flex flex-row space-x-2 items-center ml-3'>
                            <Input
                                variant='normal'
                                placeholder='Novo Titulo'
                                defaultValue={data.name}
                                onChange={({ target: { value } }) => {
                                    setEdit((dat) => ({
                                        ...dat, newData: value
                                    }))
                                }}
                            />
                            <div
                                className='border-2 border-zinc-700 rounded-full h-fit p-2 hover:bg-zinc-600 transition duration-300 ease-in-out hover:rotate-12 hover:scale-125'
                                onClick={handleEditGame}
                            >

                                <BiCheck size={25} color='white' />
                            </div>
                        </div>
                        :
                        <div className='flex flex-row space-x-2 ml-3 items-center transition duration-300 ease-in'>

                            <h1 className='text-4xl font-semibold text-center'>{data.name}</h1>
                            <button
                                className='border border-zinc-600 text-zinc-100 p-3 rounded-full font-semibold hover:bg-zinc-600 transition duration-300 ease-in-out hover:rotate-12'
                                onClick={() => {
                                    setEdit({
                                        toData: 'title',
                                        oldData: data.name,
                                        newData: ''
                                    })
                                }}
                            >
                                <BiPencil
                                    size={20}
                                />
                            </button>
                        </div>
                    }
                    {edit.toData === 'price' ? <div className='flex flex-row space-x-2 items-center'>
                        <Input
                            variant='normal'
                            type='number'
                            placeholder='Novo Preço'
                            defaultValue={data.price}
                            max={1000}
                            min={1}
                            onChange={({ target: { value } }) => {
                                setEdit((dat) => ({
                                    ...dat, newData: value
                                }))
                            }}
                        />
                        <div
                            className='border-2 border-zinc-700 rounded-full h-fit p-2 hover:bg-zinc-600 transition duration-300 ease-in-out hover:rotate-12 hover:scale-125'
                            onClick={handleEditGame}
                        >
                            <BiCheck size={25} color='white' />
                        </div>
                    </div>
                        : (
                            <div className='flex flex-row space-x-2 items-center'>
                                <p className='text-zinc-300 ml-4'>
                                    {data.price} €
                                </p>
                                <button
                                    className='border border-zinc-600 text-zinc-100 p-3 rounded-full font-semibold hover:bg-zinc-600 transition duration-300 ease-in-out hover:rotate-12'
                                    onClick={() => {
                                        setEdit({
                                            toData: 'price',
                                            oldData: data.name,
                                            newData: ''
                                        })
                                    }}
                                >
                                    <BiPencil
                                        size={20}
                                    />
                                </button>
                            </div>
                        )}
                    {edit.toData === 'description'
                        ? <div className='flex flex-row space-x-2 items-center ml-3'>
                            <TextArea
                                variant='normal'
                                placeholder='Nova descrição'
                                rows={8}
                                cols={30}
                                onChange={({ target: { value } }) => {
                                    setEdit((dat) => ({
                                        ...dat, newData: value
                                    }))
                                }}
                            >
                                {data.description}
                            </TextArea>
                            <div
                                className='border-2 border-zinc-700 rounded-full h-fit p-2 hover:bg-zinc-600 transition duration-300 ease-in-out hover:rotate-12 hover:scale-125'
                                onClick={handleEditGame}
                            >

                                <BiCheck size={25} color='white' />
                            </div>
                        </div>
                        :
                        <div className='flex flex-row space-x-2 items-center'>
                            <p className='text-zinc-400 ml-4'>
                                {data.description}
                            </p>
                            <button
                                className='border border-zinc-600 text-zinc-100 p-3 rounded-full font-semibold hover:bg-zinc-600 transition duration-300 ease-in-out hover:rotate-12'
                                onClick={() => {
                                    setEdit({
                                        toData: 'description',
                                        oldData: data.name,
                                        newData: ''
                                    })
                                }}
                            >
                                <BiPencil
                                    size={20}
                                />
                            </button>
                        </div>
                    }



                    <div className='ml-4 mt-4 max-w-fit'>
                        <div
                            className='bg-red-600 text-zinc-100 p-3 rounded-md text-center hover:bg-red-500 active:bg-red-40 cursor-pointer'
                        >
                            <Link
                                href={'/admin/delete/' + id}
                                className='p-3'
                            >
                                Remover
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
