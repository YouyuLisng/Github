"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
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
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Texteditor from "@/components/Texteditor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast";
import { GitHubIssue } from '@/type/type'
import editIssues from '@/app/actions/Issues/editIssues'

interface EditIssuesFormProps {
    reponame: string;
    issues: GitHubIssue;
    currentUser: GitHubUser,
    accessToken: string;
    handleCloseDialog: () => void;
}

export default function EditIssuesForm({
    reponame,
    issues,
    currentUser,
    accessToken,
    handleCloseDialog
}: EditIssuesFormProps) {
    const router = useRouter();
    const formSchema = z.object({
        title: z.string().min(1, { message: "title必須填寫" }),
        body: z.string().min(30, { message: "內容至少需要30字" }),
    });    

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: issues.title,
            body: issues.body,
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch(`https://api.github.com/repos/${currentUser.login}/${reponame}/issues/${issues.number}`, {
                method: 'PATCH',
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
            router.push(`/user/${currentUser.login}`)
        } catch (error) {
            console.error("未知錯誤:", error);
        }
    };
    
    return (
        <div className="max-[800px]">
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
