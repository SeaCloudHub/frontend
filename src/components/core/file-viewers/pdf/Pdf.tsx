import { FileViewerProps } from '@/utils/types/file-viewer-props.type';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Iframe from '../iframe/IFrame';

const Pdf: React.FC<FileViewerProps> = ({ src, style, className }) => {
  const [url, setUrl] = useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(src, {
        responseType: 'blob',
      });
      setUrl(URL.createObjectURL(data));
    };
    fetchData();
  }, [src]);
  return <Iframe src={url} style={style} className={className} isHtml={false} />;
};

export default Pdf;
