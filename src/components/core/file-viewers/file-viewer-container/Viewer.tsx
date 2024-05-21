import { FileViewerProps } from '@/utils/types/file-viewer-props.type';
import React from 'react';
import Docx from '../docx/Docx';
import Image from '../image/Image';
import Pdf from '../pdf/Pdf';
import UnSupportFile from '../un-supported-file/UnSupportFile';
import Text from '../text/Text';
import Video from '../video/Video';

const Viewer: React.FC<FileViewerProps> = (props) => {
  const { fileType } = props;
  switch (fileType) {
    case 'pdf': {
      return <Pdf {...props} />;
    }
    case 'document': {
      return <Docx {...props} />;
    }
    case 'image': {
      return <Image {...props} />;
    }
    case 'text': {
      return <Text {...props} />;
    }
    case 'video': {
      return <Video {...props} />;
    }
    default: {
      return <UnSupportFile {...props} />;
    }
  }
};

export default Viewer;
