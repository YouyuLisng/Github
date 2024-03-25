import { RepoList } from "@/components/RepoList/RepoList";
import { Resizable } from "@/components/Resizable";
import type { Metadata } from "next";
import fetchRepos from "./actions/fetchRepos";

export const metadata: Metadata = {
    title: "Dcard 2024 Web Frontend Intern Homework",
    description: "Dcard 2024 Web Frontend Intern Homework",
};

export default async function Home() {
    const repos = await fetchRepos(1);
    return (
        <>
            <RepoList repo={repos} />
        </>
    );
}
