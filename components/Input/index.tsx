import React, { InputHTMLAttributes } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    variant: 'normal' | 'error' | 'light'| 'light-error';
    isShowing?: boolean;
}

export default function Input({ variant, isShowing=false, ...rest }: Props) {

    const variants = {
        normal: 'p-3 rounded-md bg-zinc-200 dark:bg-zinc-700 focus:outline-none focus:bg-zinc-300 dark:focus:bg-zinc-600 border border-zinc-500 dark:border-zinc-700 dark:hover:bg-zinc-600 focus:border-zinc-300 dark:focus:border-zinc-500 placeholder:text-sm placeholder:text-zinc-600 dark:placeholder:text-zinc-400 transition duration-300 ease-in-out',
        error: 'p-3 rounded-md bg-zinc-200 dark:bg-zinc-700 focus:outline-none focus:bg-zinc-300 dark:focus:bg-zinc-600 border border-red-500 hover:bg-zinc-600 focus:border-red-500 placeholder:text-sm placeholder:text-red-400 transition duration-300 ease-in-out',
        light: 'p-3 rounded-md bg-zinc-200 focus:outline-none focus:bg-zinc-300 border border-zinc-100 hover:bg-zinc-300 focus:border-zinc-300 placeholder:text-sm placeholder:text-zinc-600 transition duration-300 ease-in-out',
        lightError: 'p-3 rounded-md bg-zinc-100 focus:outline-none focus:bg-zinc-200 border border-red-400 hover:bg-zinc-200 focus:border-red-400 placeholder:text-sm placeholder:text-red-300 transition duration-300 ease-in-out',
    }

    function getVariant(variant: 'normal' | 'error' | 'light' | 'light-error') {
        switch(variant) {
            case 'normal':
                return variants.normal
            case 'error':
                return variants.error
            case 'light':
                return variants.light
            case 'light-error':
                return variants.lightError
            default:
                return variants.normal
        }
    }

    return <input
        className={getVariant(variant) + ' ' + rest.className}
        {...rest}
    />
}
