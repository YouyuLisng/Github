import Image from "next/image";

interface AvatarProps {
    src: string | null | undefined;
    width: number;
    height: number;
}

const UserAvatar: React.FC<AvatarProps> = ({ src, width, height }) => {
    return ( 
        <Image 
            className="rounded-full border-4 border-white" 
            width={width} 
            height={height} 
            alt="Avatar" 
            src={src || '/images/placeholder.jpeg'}
        />
    );
}

export default UserAvatar;
