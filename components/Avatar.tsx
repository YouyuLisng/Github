import Image from "next/image";

interface AvatarProps {
    src: string | null | undefined;
    width: number;
    height: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, width, height }) => {
    return ( 
        <Image 
            className="rounded-full" 
            width={width} 
            height={height} 
            alt="Avatar" 
            src={src || '/images/placeholder.jpeg'}
        />
    );
}

export default Avatar;
