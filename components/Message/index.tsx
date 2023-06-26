import React from 'react'
import { BiInfoCircle, BiCheck, BiX } from 'react-icons/bi'

type Props = {
    message: string;
    variant: 'error' | 'info' | 'success';
}

export default function Message({ variant, message }: Props) {
    const variants = {
        error: 'flex flex-row items-center space-x-2 p-4 text-sm rounded-md border-2 border-red-500 bg-transparent text-zinc-100 max-w-full break-words',
        info: 'flex flex-row items-center space-x-2 p-4 text-sm rounded-md border-2 border-blue-600 bg-transparent text-zinc-100 max-w-full break-words',
        success: ''
    }

    const icons = {
        error: <BiX color={'rgb(239 68 68)'} size={30} />,
        info: <BiInfoCircle color='rgb(37 99 235)' size={25} />,
        success: <BiCheck color='rgb(22 163 74)' size={3} />
    }

    function getVariant() {
        switch(variant) {
            case 'error':
                return variants.error
            case 'info':
                return variants.info
            case 'success':
                return variants.success
            default:
                return variants.info
        }
    }
    
    function getIcon() {
        switch(variant) {
            case 'error':
                return icons.error
            case 'info':
                return icons.info
            case 'success':
                return icons.success
            default:
                return icons.info
        }
    }

    return (
        <div className={getVariant()}>
            {getIcon()}
            <p>{message}</p>
        </div>
    )
}
