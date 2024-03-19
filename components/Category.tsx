import React from 'react'
import { FaNodeJs } from "react-icons/fa";

interface categoryProps {
    label: string;
    Icon?: React.ReactNode;
    onClick?: () => void;
}

export default function category({
    label,
    Icon,
    onClick
}: categoryProps) {
    return (
        <>
            <div onClick={onClick} className='flex items-center px-2 text-white cursor-pointer p-3 hover:bg-cyan-800'>
                {Icon}
                <p className='font-bold text-md'>{label}</p>
            </div>
        </>
    )
}
