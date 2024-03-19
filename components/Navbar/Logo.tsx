import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
    return(
        <>
            <div className='flex items-center justify-center py-3'>
                <Image
                    onClick={() => router.push('/')}
                    className="cursor-pointer"
                    src="/next.svg"
                    width="74" 
                    height="28" 
                    alt="Logo"
                />
            </div>
        </>
    )
};

export default Logo;