import { readText } from '@/utils/function/render';
import { FileViewerProps } from '@/utils/types/file-viewer-props.type';
import { useEffect, useState } from 'react';

const Text: React.FC<FileViewerProps> = ({ file }) => {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const textData = await readText(file);
        setText(textData as string);
      } catch (error) {
        console.error('Error reading text file:', error);
      }
    };

    fetchText();
  }, [file]);

  return <pre className='word-break  my-auto block h-full w-full whitespace-pre-wrap pt-2 text-xs'>{text}</pre>;
};

export default Text;
