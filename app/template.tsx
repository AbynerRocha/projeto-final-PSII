'use client'

import Header from '@/components/Header'
import React from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'

export default function Template({ children }: { children: React.ReactNode }) {
    const reactQueryClient = new QueryClient()
    
    return (

        <QueryClientProvider client={reactQueryClient}>
            <div className='h-screen bg-zinc-900'>
                <Header />
                {children}
            </div>
        </QueryClientProvider>
    )
}
