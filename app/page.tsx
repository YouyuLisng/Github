import { Resizable } from "@/components/Resizable";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dcard 2024 Web Frontend Intern Homework",
    description: "Dcard 2024 Web Frontend Intern Homework",
};

export default function Home() {
    return (
        <>
            <Resizable />
        </>
    );
}
