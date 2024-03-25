import React from 'react'
import fetchUserPost from '@/app/actions/fetchUserPost';
import type { Metadata } from "next";
import EmptyState from '@/components/EmptyState';

export const metadata: Metadata = {
    title: "Not found",
    description: "Not found",
};
export default async function PostPage() {
    const posts = await fetchUserPost();
    return (
        <EmptyState />
    )
}
