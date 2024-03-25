"use client"
import React from 'react'
import { FaEdit } from "react-icons/fa";

export default function EditBtn() {
    return (
        <div className="fixed bottom-10 right-10 bg-sky-500 rounded-md cursor-pointer z-50">
            <div className='p-2'>
                <FaEdit className='text-white' size={20} />123
            </div>
        </div>
    )
}
