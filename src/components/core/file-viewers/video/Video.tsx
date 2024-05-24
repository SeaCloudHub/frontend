import { FileViewerProps } from '@/utils/types/file-viewer-props.type';
import { useEffect, useState } from 'react';

const Video: React.FC<FileViewerProps> = ({ file }) => {
  //  const [loading, setLoading] = useState(true);
  // const onCanPlay = () => setLoading(false);
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
  return (
    <div>
      <video controls src={src}>
        Video playback is not supported by your browser.
      </video>
    </div>
  );
};

export default Video;
