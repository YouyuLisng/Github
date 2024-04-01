"use client";

interface HeadingProps {
    title?: string;
    subtitle?: string;
    center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle,
    center
}) => {
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="text-md md:text-2xl font-bold text-black">
                {title}
            </div>
            <div className="text-sm md:text-md text-light text-neutral-500 mt-2 mb-2">
                {subtitle}
            </div>
        </div>
    );
}

export default Heading;