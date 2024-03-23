
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/Container";
import AuthProvider from '@/Context/auth';

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
                    <Navbar />
                    <div className="pb-20 pt-16">
                        <Container>
                            {children}
                        </Container>
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
