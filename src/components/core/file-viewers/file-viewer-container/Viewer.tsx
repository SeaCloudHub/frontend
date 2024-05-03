import { FileViewerProps } from '@/utils/types/file-viewer-props.type';
import React from 'react';
import Audio from '../audio/Audio';
import Docx from '../docx/Docx';
import Image from '../image/Image';
import Pdf from '../pdf/Pdf';
import Text from '../text/Text';

const Viewer: React.FC<FileViewerProps> = (props) => {
  const { fileType } = props;
  console.log(fileType);
  switch (fileType) {
    case 'pdf': {
      return <Pdf {...props} />;
    }
    case 'application/zip': {
      return <Docx {...props} />;
    }
    case 'xlsx': {
      return <Pdf {...props} />;
    }
    case 'pptx': {
      return <Pdf {...props} />;
    }
    case 'text/plain; charset=utf-8': {
      return <Text {...props} />;
    }
    case 'image/png': {
      return <Image {...props} />;
    }
    case 'image/jpg': {
      return <Image {...props} />;
    }
    case 'image/jpeg': {
      return <Image {...props} />;
    }
    default: {
      return <Pdf {...props} />;
    }
  }
};

export default Viewer;
