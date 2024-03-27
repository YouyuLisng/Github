
import NotFoundState from '@/components/NotFoundState';
import React from 'react'

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Not found",
    description: "Not found",
};

export default function NotFound() {
    return (
        <NotFoundState showReaet={true} />
    )
}
