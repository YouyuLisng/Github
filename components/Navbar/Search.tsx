"use client"
import React from 'react'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function Search() {
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
        console.log(values);
        route.push(`/users/${values.text}/repos`);
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex justify-center items-center px-8">
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                <Input
                                    className='w-[550px] h-[30px] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0'
                                    placeholder="搜尋關鍵字"
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <button className='bg-btnblue'>
                            <IoSearchOutline className="w-4 h-4 m-2 text-white" />
                        </button>
                    </div>
                </form>
            </Form>
        </>
    )
}
