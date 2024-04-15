import { FileViewerProps } from '@/utils/types/file-viewer-props.type';
import React from 'react';
import Audio from '../audio/Audio';
import Docx from '../docx/Docx';
import Pdf from '../pdf/Pdf';

const Viewer: React.FC<FileViewerProps> = (props) => {
  const { fileType } = props;

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
    case 'txt':
    case 'json':
    case 'js':
    case 'css':
    case 'java':
    case 'py':
    case 'html':
    case 'jsx':
    case 'ts':
    case 'tsx':
    case 'xml':
    case 'md':
    case 'log': {
      return <Pdf {...props} />;
    }
    case 'mp3':
    case 'mpeg':
    case 'aac':
    case 'wav':
    case 'flac':
    case 'm4a':
    case 'ogg': {
      return <Audio {...props} />;
    }
    case 'webm':
    case 'mp4': {
      return <Pdf {...props} />;
    }
    case 'jpg':
    case 'jpeg':
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
