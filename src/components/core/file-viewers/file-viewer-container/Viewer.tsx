import { FileViewerProps } from '@/utils/types/file-viewer-props.type';
import React from 'react';
import Audio from '../audio/Audio';
import Docx from '../docx/Docx';
import Pdf from '../pdf/Pdf';
import Text from '../text/Text';
import Image from '../image/Image';

const Viewer: React.FC<FileViewerProps> = (props) => {
  const { fileType } = props;
  console.log(fileType);
  switch (fileType) {
    case 'pdf': {
      return <Pdf {...props} />;
    }
    case 'docx': {
      return <Docx {...props} />;
    }
    case 'xlsx': {
      return <Pdf {...props} />;
    }
    case 'pptx': {
      return <Pdf {...props} />;
    }
    case 'text/plain': {
      return <Text {...props} />;
    }
    case 'log': {
      return <Pdf {...props} />;
    }
    case 'ogg': {
      return <Audio {...props} />;
    }
    case 'webm':
    case 'mp4': {
      return <Pdf {...props} />;
    }
    case 'jpg':
    case 'image/jpeg': {
      return <Image {...props} />;
    }
    case 'gif':
    case 'png': {
      return <Pdf {...props} />;
    }
    default: {
      return <Pdf {...props} />;
    }
  }
};

export default Viewer;
