"use client"
import React from 'react'
import { useRouter } from "next/navigation";

import { IoSearchOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

interface SearchProps {
    searchType: 'user' | 'repo';
}

export default function Search({ searchType }: SearchProps) {
    const route = useRouter();

    const formSchema = z.object({
        text: z.string(),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: '',
        }
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (searchType === 'repo') {
            route.push(`/users/${values.text}`);
        } else if (searchType === 'user') {
            route.push(`/user/${values.text}`);
        }
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex justify-center items-center md:px-8 px-4">
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className='w-[300px] md:w-[550px] h-[48px] rounded-e-none focus-visible:ring-0 focus-visible:ring-offset-0'
                                        placeholder={`Search a GitHub User ${searchType === 'user' ? 'Repository' : 'Posts (Issues)'}`}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <button className='bg-btnblue rounded-e-md'>
                            <IoSearchOutline className="w-8 h-8 m-2 text-white rounded-e-md" />
                        </button>
                    </div>
                </form>
            </Form>
        </>
    )
}
