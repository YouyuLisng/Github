import React from 'react'
import { format } from 'date-fns';

interface TimeProps {
    time: string;
}
export default function Time({
    time
}: TimeProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'yyyy-MM-dd');
    };
    return (
        <div>
            <p className='text-sm text-zinc-500'>{formatDate(time)}</p>
        </div>
    )
}
