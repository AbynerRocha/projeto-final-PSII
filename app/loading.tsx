import React from 'react'
import { MoonLoader } from 'react-spinners'

export default function Loading() {
    return (
        <div className='bg-zinc-900 flex h-screen justify-center items-center'>
            <MoonLoader size={45} color='white' />
        </div>
    )
}
