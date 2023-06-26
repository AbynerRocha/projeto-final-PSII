'use client'
import Header from '@/components/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query'
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const reactQueryClient = new QueryClient()

    return (
        <html lang="pt">
            <QueryClientProvider client={reactQueryClient}>
                <body className={inter.className}>
                    <div className='h-screen bg-zinc-900'>
                        <Header />
                        {children}
                    </div>
                </body>
            </QueryClientProvider>
        </html>
    )
}
