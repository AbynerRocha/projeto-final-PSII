'use client'

import { UserData } from "@/@types/user";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import env from "@/utils/env";

interface AuthContextData {
    data: UserData;
    signIn: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<any>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<UserData>({} as UserData)

    useEffect(() => {
        loadData()
    }, [])

    function signIn(email: string, password: string) {
        return new Promise(async (resolve, reject) => {
            const res = await fetch('/api/user/login', { body: JSON.stringify({ email, password }), method: 'POST' })
            const resData = await res.json()
            const oneDayExpires = new Date(Date.now() + 86400*1000)

            if(res.status !== 201){ 
                reject(resData)
            }
            
            Cookies.set(env.COOKIES_PREFIXES.AUTH_TOKEN, resData.token, { expires: oneDayExpires })

            setData({
                name: resData.user.name,
                email: resData.user.email,
                accessLevel: resData.user.accessLevel,
                token: resData.token
            })
            
            resolve(true)
        })
    }

    function signOut() {
        return new Promise((resolve, reject) => {

        })
    }

    async function loadData() {
        const cookie = Cookies.get(env.COOKIES_PREFIXES.AUTH_TOKEN)

        if(!cookie) return

        const res = await fetch('/api/user/validate?t='+cookie)
        const data = await res.json()

        if(res.status !== 200) {
            if(data.error === 'TOKEN_EXPIRED') {
                Cookies.remove(env.COOKIES_PREFIXES.AUTH_TOKEN)
            }
        } 

        setData({
            name: data.user.name,
            accessLevel: data.user.accessLevel,
            email: data.user.email,
            token: data.newToken
        })
    }

    return <AuthContext.Provider value={{ data, signIn, signOut }}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('Para utilizar o useAuth, tem que envolver a pagina em AuthProvider')
    }

    return context
}
