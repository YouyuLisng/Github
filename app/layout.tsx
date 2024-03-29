"use client"
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/Container";
import { AuthProvider } from '@/Context/auth';
import ToasterProvider from '@/components/providers/ToastProvider';
import { RepoDataProvider } from "@/Context/RepoContext";

const inter = Open_Sans({ subsets: ["latin"] });

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({
    children,
}: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <RepoDataProvider>
                        <ToasterProvider />
                        <Navbar />
                        <div className="pb-20 pt-16 relative">
                            <Container>
                                {children}
                            </Container>
                        </div>
                    </RepoDataProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
