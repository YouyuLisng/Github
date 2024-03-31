"use client";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading";
import Button from "./Button";
interface EmptyStateProps {
    title?: string,
    subtitle?: string,
    showReaet?: boolean
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    subtitle,
    showReaet,
}) => {
    const router = useRouter();
    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            <div className="w-48 mt-4">
                {showReaet &&(
                    <Button 
                        outline
                        label="返回"
                        onClick={() => router.back() }
                    />
                )}
            </div>
        </div>
    );
}

export default EmptyState;