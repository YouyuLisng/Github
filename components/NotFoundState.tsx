"use client";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { IoIosWarning } from "react-icons/io";
interface NotFoundStateProps {
    showReaet?: boolean
}

const NotFoundState: React.FC<NotFoundStateProps> = ({
    showReaet,
}) => {
    const router = useRouter();
    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <IoIosWarning className='text-yellow-500' size={60} />
            <p className="text-white text-2xl">找不到頁面</p>
            <div className="w-48 mt-4">
                {showReaet &&(
                    <Button 
                        outline
                        label="返回"
                        onClick={() => router.push('/') }
                    />
                )}
            </div>
        </div>
    );
}

export default NotFoundState;