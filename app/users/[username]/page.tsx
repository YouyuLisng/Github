import EmptyState from '@/components/EmptyState'
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Not found",
    description: "Not found",
};

export default function page() {
  return (
    <EmptyState title='Oops！' subtitle='Not Found' showReaet={true} />
  )
}
