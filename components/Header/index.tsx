import React from 'react'
import { FiSearch } from 'react-icons/fi'

export default function Header() {
    return (
        <header className='mb-6 w-full h-20 bg-zinc-800 flex items-center'>
            <div>
                <h1 className='text-3xl text-zinc-100 ml-4 font-semibold'>Game Space</h1>
            </div>
            <div className='flex flex-1 justify-end'>
                <div className='rounded-md mr-3 py-3 px-4 bg-zinc-700 border border-zinc-900 text-zinc-100 flex items-center justify-center'>
                    <input
                        className=' border-none  bg-transparent focus:outline-none'
                        type="text"
                        placeholder='Pesquisar'
                    />
                    <button className='ml-1'>
                        <FiSearch size={25} color='white' />
                    </button>
                </div>
            </div>
        </header>
    )
}
