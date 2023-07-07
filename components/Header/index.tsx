'use client'

import { useAuth } from '@/context/auth'
import Link from 'next/link'
import React, { useState } from 'react'
import { FiSearch, FiUser } from 'react-icons/fi'
import DropDown from '../Dropdown'

export default function Header() {
    const auth = useAuth()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const user = {
        name: auth.data.name
    }

    function userPhoto() {
        if (user.name.includes(' ')) {
            const name = user.name.split(' ')

            if (name[1].length > 0) {
                return <div className='mx-3 p-4 cursor-pointer rounded-full text-zinc-100 bg-blue-700 font-semibold'>
                    <span>{name[0][0].toUpperCase() + name[1][0].toLowerCase()}</span>
                </div>
            }
        }

        return <button data-dropdown-toggle="dropdownAvatar" className='mx-3 p-4 cursor-pointer rounded-full text-zinc-100 bg-blue-700 font-semibold'>
            <span>{user.name[0].toUpperCase() + user.name[1].toLowerCase()}</span>
        </button >
    }

    return (
        <header className='mb-6 w-full h-20 bg-zinc-300 dark:bg-zinc-800 flex items-center border-b-2 dark:border-zinc-700'>
            <div>
                <Link href='/' className='text-3xl text-zinc-700 dark:text-zinc-100 ml-4 font-semibold'>🚀 Game Space</Link>
            </div>
            <div className='flex flex-1 justify-end'>
                <div className='rounded-md mr-3 py-3 px-4 bg-zinc-200 dark:bg-zinc-700 border-2 border-zinc-300 dark:border-zinc-900  text-zinc-700 dark:text-zinc-100 flex items-center justify-center hover:bg-zinc-300 dark:hover:bg-zinc-600'>
                    <input
                        className=' border-none bg-transparent focus:outline-none placeholder:text-zinc-700 dark:placeholder:text-zinc-300'
                        type="text"
                        placeholder='Pesquisar'
                    />
                    <button className='ml-1'>
                        <FiSearch size={25} className='text-zinc-700 darK:text-zinc-50' />
                    </button>
                </div>
                {auth.data.token
                    ? userPhoto()
                    : <div className='flex items-center mx-3 border border-zinc-800 dark:border-zinc-100 rounded-full cursor-pointer'>
                        <Link
                            className='p-3'
                            href={'/login/'}
                        >
                            <FiUser size={27} className='text-zinc-700 darK:text-zinc-50' />
                        </Link>
                    </div>}

                
            </div>

        </header>
    )
}

/*

    
<button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
    <span className="sr-only">Open user menu</span>
    <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo">
</button>

<!-- Dropdown menu -->

*/
