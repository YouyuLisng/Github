

import Container from "@/components/Container";
import { IssuesFormModal } from "@/components/Modal/IssuesFormModal";


interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({
    children,
}: RootLayoutProps) {
    return (
        <Container>
            {children}
            <IssuesFormModal />
        </Container>
    );
}
