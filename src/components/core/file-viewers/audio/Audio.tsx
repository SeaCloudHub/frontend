import { FileViewerProps } from '@/utils/types/file-viewer-props.type';
import { useState } from 'react';

const Audio: React.FC<FileViewerProps> = () => {
  const [loading, setLoading] = useState(true);
  const visibility = loading ? 'hidden' : 'visible';
  const onCanPlay = () => setLoading(false);
  return (
    <div>
      {/* {!src && <img src='./loader.svg' />}
      <audio className={className} style={{ visibility, ...style }} controls onCanPlay={onCanPlay} src={src}>
        Video playback is not supported by your browser.
      </audio> */}
    </div>
  );
};

export default Audio;
