import Container from "@/components/Container";
import { IssuesFormModal } from "@/components/Modal/IssuesFormModal";

interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        username: string;
        reponame: string;
    };
}

export default function RootLayout({
    children,
    params: { username, reponame }
}: RootLayoutProps) {
    return (
        <Container>
            {children}
            <IssuesFormModal Type={"repo"} reponame={reponame} />
        </Container>
    );
}
