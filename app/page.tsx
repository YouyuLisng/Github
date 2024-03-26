import { RepoList } from "@/components/RepoList/RepoList";
import type { Metadata } from "next";
import fetchRepos from "./actions/Repo/fetchRepos";
import Search from "@/components/Navbar/Search";

export const metadata: Metadata = {
    title: "Dcard 2024 Web Frontend Intern Homework",
    description: "Dcard 2024 Web Frontend Intern Homework",
};

export default async function Home() {
    const repos = await fetchRepos(1);
    return (
        <>
            <div className="w-full h-[200px] md:h-[400px] flex items-center justify-center">
                <Search />
            </div>
            {/* <RepoList repo={repos} /> */}
        </>
    );
}
