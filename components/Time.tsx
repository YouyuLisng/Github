"use client"
import React, { useMemo } from 'react';
import { format } from 'date-fns';

interface TimeProps {
    time: string;
}

const Time = ({ time }: TimeProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'yyyy-MM-dd');
    };

    const formattedTime = useMemo(() => {
        return formatDate(time);
    }, [time]);

    return (
        <p className='text-sm text-zinc-500'>{formattedTime}</p>
    );
}

export default Time;
