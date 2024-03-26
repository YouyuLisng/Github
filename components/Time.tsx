"use client"
import React from 'react'
import { format, parseISO } from 'date-fns';
import { useState, useEffect } from 'react'

interface TimeProps {
    time: string;
}

export default function Time({ time }: TimeProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, []);

    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, 'yyyy-MM-dd');
    };

    return (
        <>
            {isClient ? <p className='text-xs text-zinc-500' suppressHydrationWarning={true}>{formatDate(time)}</p> : null }
        </>
    )
}
