'use client'

import Header from '@/components/Header'
import { AuthProvider, useAuth } from '@/context/auth'
import React from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'

export default function Template({ children }: { children: React.ReactNode }) {
    const reactQueryClient = new QueryClient()
    const {} = useAuth()
    
    return (

        <QueryClientProvider client={reactQueryClient}>
            <AuthProvider>
                <div className='h-screen flex flex-col flex-1 bg-zinc-200 dark:bg-zinc-900'>
                    <Header />
                    {children}
                </div>
            </AuthProvider>
        </QueryClientProvider>
    )
}
