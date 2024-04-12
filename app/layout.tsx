"use client"
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/Container";
import { AuthProvider } from '@/Context/AuthContext';
import ToasterProvider from '@/components/providers/ToastProvider';
import { RepoDataProvider } from "@/Context/RepoContext";
import { IssuesProvider } from "@/Context/IssuesContext";

const inter = Open_Sans({ subsets: ["latin"] });

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({
    children,
}: RootLayoutProps) {
    return (
        <html lang="zh-Hant">
            <body className={inter.className}>
                <AuthProvider>
                    <RepoDataProvider>
                        <IssuesProvider>
                            <ToasterProvider />
                            <Navbar />
                            <div className="pb-20 pt-16 relative">
                                <Container>
                                    {children}
                                </Container>
                            </div>
                        </IssuesProvider>
                    </RepoDataProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
