'use client'

import Input from '@/components/Input'
import Message from '@/components/Message'
import { useAuth } from '@/context/auth'
import env from '@/utils/env'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Login() {
    const auth = useAuth()
    const route = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<{
        message: string;
        target: '' | 'email' | 'password' | 'message'
    }>({ message: '', target: '' })

    if (Cookies.get(env.COOKIES_PREFIXES.AUTH_TOKEN)) {
        if (auth.data.accessLevel === 2) {
            route.push('/admin/')
            return
        }

        route.push('/')
    }

    function handleSubmit() {
        if (email === '' || password === '') {
            setError({
                target: email === '' ? 'email' : 'password',
                message: 'Este campo é obrigatório.'
            })
            return
        }

        auth.signIn(email, password)
            .then(() => {
                route.push('/')
            })
            .catch((err) => {
                console.log(err);

                setError({
                    message: JSON.stringify(err),
                    target: 'message'
                })
            })
    }


    return (
        <div className='h-screen bg-zinc-200 dark:bg-zinc-900 flex flex-col w-full'>
            <div className='flex flex-1 flex-col mt-32 items-center w-full space-y-4'>
                <div className='border-b bg-zinc-200 dark:border-zinc-700 w-18'>
                    <h1 className='text-zinc-700 dark:text-zinc-100 text-center my-3 text-3xl font-semibold'>🚀 Login ⭐</h1>
                </div>
                <form className='flex flex-col items-center w-full space-y-4' onSubmit={(e) => e.preventDefault()}>
                    <div className='flex flex-col text-zinc-700 dark:text-zinc-200 space-y-2'>
                        <label htmlFor="">Email</label>
                        <Input
                            variant='normal'
                            placeholder='Digite aqui'
                            onChange={({ target: { value } }) => {
                                setEmail(value)
                            }}
                        />
                    </div>
                    <div className='flex flex-col text-zinc-700 dark:text-zinc-200 space-y-2'>
                        <label htmlFor="">Senha</label>
                        <Input
                            type='password'
                            variant='normal'
                            placeholder='Digite aqui'
                            onChange={({ target: { value } }) => {
                                setPassword(value)
                            }}
                        />

                        <Link
                            href={'/recoverypass'}
                            className='text-blue-700 dark:text-blue-400 hover:underline text-right'
                        >Esqueceu a sua senha?</Link>
                    </div>
                    <div className='w-full flex flex-col items-center justify-center space-y-3'>
                        <button type='button' onClick={handleSubmit} className='py-3 w-fit  px-8 rounded-md bg-green-500 font-semibold hover:bg-green-400'>Entrar</button>
                        <Link
                            href={'/registo'}
                            className='text-blue-700 dark:text-blue-400 hover:underline text-center'
                        >
                            Não tem uma conta?
                        </Link>
                    </div>
                </form>

                {error.target === 'message' && <Message message={error.message} variant='error' />}
            </div>
        </div>
    )
}
