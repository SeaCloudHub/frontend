type Style = {
  [key: string]: string | number | boolean;
};
export type FileViewerProps = {
  className?: string;
  style?: Style;
  isHtml?: boolean;
  fileType?: string;
  src: string;
};
