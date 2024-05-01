import { FileViewerProps } from '@/utils/types/file-viewer-props.type';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Iframe from '../iframe/IFrame';

const Pdf: React.FC<FileViewerProps> = ({ file }) => {
  const [url, setUrl] = useState<string>('');
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    const fetchText = async () => {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          reader.result && setSrc(reader.result.toString());
        };
        reader.onerror = (err) => {};
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error reading text file:', error);
      }
    };

    fetchText();
  }, [file]);
  useEffect(() => {
    if (src) {
      const fetchData = async () => {
        const { data } = await axios.get(src, {
          responseType: 'blob',
        });
        setUrl(URL.createObjectURL(data));
      };
      fetchData();
    }
  }, [src]);
  return <Iframe url={url} isHtml={false} />;
};

export default Pdf;
