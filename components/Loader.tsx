// Loader.tsx
"use client"
import dynamic from 'next/dynamic';
import { useState } from 'react';

const MoonLoader = dynamic(() => import("react-spinners/MoonLoader"), {
    ssr: false
});

const Loader = () => {
    const [loading, setLoading] = useState(true);

    if (!loading) {
        return null;
    }

    return (
        <div className="w-full h-full flex justify-center items-center bg-opacity-50 z-50">
            <MoonLoader 
                size={30}
                color="#3397cf"
            />
        </div> 
    );
}

export default Loader;
