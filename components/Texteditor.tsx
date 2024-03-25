import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const DynamicQuill = dynamic(() => import('react-quill'), { ssr: false });

interface EditorProps {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

const Texteditor: React.FC<EditorProps> = ({ content, setContent }) => {
    const handleChange = (value: string) => {
        // Handle content changes
        setContent(value);
    };

    return (
        <div className='react-quill-container'>
            <DynamicQuill
                theme="snow"
                value={content}
                onChange={handleChange}
            />
        </div>
    );
};

export default Texteditor;
