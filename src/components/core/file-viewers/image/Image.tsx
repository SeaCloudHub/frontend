import { FileViewerProps } from '@/utils/types/file-viewer-props.type';
import { useEffect, useState } from 'react';

const Image: React.FC<FileViewerProps> = ({ file }) => {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          reader.result && setSrc(reader.result.toString());
        };
        reader.onerror = (err) => {
          alert(err);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error reading text file:', error);
      }
    };

    fetchText();
  }, [file]);

  return <>{src && <img src={src} alt='Image' className='' />}</>;
};

export default Image;
