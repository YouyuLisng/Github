import React from 'react'
import { format, parseISO } from 'date-fns';

interface TimeProps {
    time: string;
}

export default function Time({ time }: TimeProps) {
    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, 'yyyy-MM-dd');
    };

    return (
        <>
            {formatDate(time)}
        </>
    )
}
