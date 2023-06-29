'use client'

import { GamesData } from '@/@types/games';
import Input from '@/components/Input';
import Message from '@/components/Message';
import Modal from '@/components/Modal';
import Image from 'next/image';
import { useState } from 'react'
import { BiPencil } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { MoonLoader } from 'react-spinners';


export default function Gerir({ params }: { params: { id: number; } }) {
    const { id } = params
    const [isModalOpen, setIsModalOpen] = useState(true)

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

    function handleStateModal(state: boolean) {
        setIsModalOpen(state)
    }

    function showModal(edit: 'title' | 'description') {
        return (
            <Modal
                isOpen={true}
                onStateChange={handleStateModal}
                title='Editar Descrição'
            >
                <div className='p-3'>
                    <label>Nova Descrição</label>
                    <Input
                        variant='normal'
                        placeholder='Digite aqui'
                    />
                </div>
            </Modal>
        )
    }

    return (
        <div className='text-zinc-100'>
            <div className='flex flex-row '>
                <div className='w-72 h-64 object-fill ml-7 mt-5'>
                    <Image
                        src={data.photo}
                        width={300}
                        height={250}
                        alt={data.name + ' photo'}
                    />
                </div>
                <div className='max-w-xl break-words space-y-2'>
                    <div className='flex flex-row space-x-2 ml-3 items-center'>
                        <h1 className='text-4xl font-semibold text-center'>{data.name}</h1>
                        <button
                            className='border border-zinc-600 text-zinc-100 p-3 rounded-full font-semibold'
                        >
                            <BiPencil
                                size={20}
                            />
                        </button>
                    </div>
                    <div className='flex flex-row space-x-2 items-center'>
                        <p className='text-zinc-400 ml-4'>
                            {data.description}
                        </p>
                        <button
                            className='border border-zinc-600 text-zinc-100 p-3 rounded-full font-semibold'
                            onClick={() => showModal('description')}
                        >
                            <BiPencil
                                size={20}
                            />
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={true}
                onStateChange={handleStateModal}
                title='Editar Descrição'
            >
                <div className='p-5 text-zinc-900 flex flex-col space-y-2'>
                    <label>Nova Descrição</label>
                    <Input
                        variant='light'
                        placeholder='Digite aqui'
                    />
                </div>
                <div className='text-zinc-900 ml-2 flex justify-between'>
                    <button className='bg-green-400 p-3 rounded-md mb-3 ml-3 font-semibold hover:bg-green-500'>Salvar</button>
                    <button className='bg-red-400 p-3 rounded-md mb-3 mr-4 font-semibold hover:bg-red-500'>Fechar</button>
                </div>
            </Modal>
        </div>
    )
}
