import React from 'react'
import { AiFillTag } from 'react-icons/ai'

type Props = {
    name: string;
    photo: string;
    description: string;
    price: number;
    category: string;
}

export default function Product({ name, photo, description, price, category }: Props) {
    return (
        <div className='flex-shrink-0 bg-zinc-800 rounded-md shadow-sm h-fit w-fit p-10 border-2 border-zinc-800 hover:border-2 hover:border-zinc-700'>
            <div className='flex flex-col items-center py-4'>
                <div className='h-40 w-42'>
                    <img
                        src={photo}
                        alt={name}
                        className='text-zinc-100 object-fill w-[100%] h-[100%]'
                    />
                </div>
                <div className='text-zinc-100 text-center font-bold mt-3'>
                    <span>{name}</span>
                </div>
                <div className='flex flex-row items-start space-x-1'>
                    <AiFillTag size={20} color='rgb(113 113 122)'/> 
                    <span className='text-sm text-right text-zinc-500'>
                        {category}
                    </span>
                </div>
            </div>
            <div className='text-zinc-200 text-md mt-3 break-words'>
                {description.length > 17 ? description.slice(0, 17) + '...' : description}
            </div>

            <div>
                <div>
                    <p className='text-zinc-100 font-semibold text-right mt-2'>{price} €</p>
                </div>
                <div className='space-x-4 mt-3'>
                    <button className='bg-emerald-500 text-zinc-100 rounded-md px-4 py-3'>Comprar</button>
                    <button className='bg-gray-700 text-zinc-100 rounded-md px-4 py-3'>Ver detalhes</button>
                </div>
            </div>
        </div>
    )
}
