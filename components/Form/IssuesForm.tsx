"use client"
import React, { useState } from 'react'

import { GitHubUser } from '@/type/type';
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectLabel,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Texteditor from "@/components/Texteditor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import Loader from '@/components/Loader';
import toast from "react-hot-toast";

interface IssuesFormProps {
    currentUser: GitHubUser,
    accessToken: string;
    handleCloseDialog: () => void;
}

export default function IssuesForm({
    currentUser,
    accessToken,
    handleCloseDialog
}: IssuesFormProps) {
    const [loading, setLoading] = useState(false);
    const formSchema = z.object({
        title: z.string().min(1, { message: "title必須填寫" }),
        body: z.string().min(30, { message: "內容至少需要30字" }),
        repo: z.string().min(30, { message: "內容至少需要30字" }),
    });    

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            body: '',
            repo: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch(`https://api.github.com/repos/${currentUser.login}/${values.repo}/issues`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(values)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            toast.success('成功');
            handleCloseDialog();
        } catch (error) {
            console.error("未知錯誤:", error);
        }
    };
    
    return (
        <div className="max-[800px]">
            {loading && <Loader  />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 items-center">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="uppercase text-sx font-bold text-zinc-500">Title</FormLabel>
                                <FormControl>
                                <Input
                                    placeholder="請輸入Title"
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-sx font-bold text-zinc-500">Body</FormLabel>
                                    <FormControl>
                                        <Texteditor content={field.value} setContent={(value) => form.setValue('body', value as string)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="repo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-sx font-bold text-zinc-500">活動名稱</FormLabel>
                                    <Select value={field.value} required onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue {...field} placeholder="選擇活動型態" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>請選擇活動型態</SelectLabel>
                                                <SelectItem value="1">輪播</SelectItem>
                                                <SelectItem value="2">網友熱搜</SelectItem>
                                                <SelectItem value="3">達人旅遊</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <Button className="bg-sky-700 hover:bg-sky-600 mt-5" type="submit">
                            送出
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
