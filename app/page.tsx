
import type { Metadata } from "next";
import Search from "@/components/Search";

export const metadata: Metadata = {
    title: "Dcard 2024 Web Frontend Intern Homework",
    description: "Dcard 2024 Web Frontend Intern Homework",
};

export default async function Home() {
    return (
        <>
            <div className="w-full h-[200px] md:h-[400px] flex items-center justify-center">
                <div className="grid grid-cols-1 gap-y-5">
                    <Search />
                </div>
            </div>
        </>
    );
}
