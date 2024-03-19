
interface ContainerProps {
    children: React.ReactNode,
}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
    return (
        <div className="max-w-[1320px] mx-auto md:px-2 px-2">
            {children}
        </div>
    )
};

export default Container;