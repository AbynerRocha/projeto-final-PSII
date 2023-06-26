import React, { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    variant: 'normal' | 'error';
}

export default function Input({ variant, ...rest }: Props) {

    const variants = {
        normal: 'p-3 rounded-md bg-zinc-700 focus:outline-none focus:bg-zinc-600 border border-zinc-700 hover:bg-zinc-600 focus:border-zinc-500 placeholder:text-sm placeholder:text-zinc-400',
        error: 'p-3 rounded-md bg-zinc-700 focus:outline-none focus:bg-zinc-600 border border-red-500 hover:bg-zinc-600 focus:border-red-500 placeholder:text-sm placeholder:text-red-400'
    }

    function getVariant(variant: 'normal' | 'error') {
        if(variant === 'error') return variants.error

        return variants.normal
    }

    return (
        <input
            className={getVariant(variant) + ' ' + rest.className}
            {...rest}
        />
    )
}
