import fileTypeIcons from '@/utils/constants/file-icons.constant';
import { fileSignatures } from '../constants/file-extension-validation.constant';

export const validateFileType = async (file: File, fileType?: string): Promise<boolean> => {
  if (!fileType || !(fileType in fileSignatures)) {
    return false;
  }
  const reader = new FileReader();
  const result = await new Promise<boolean>((resolve) => {
    reader.onloadend = () => {
      if (reader.readyState === FileReader.DONE) {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uintArray = new Uint8Array(arrayBuffer);
        let bytes = '';
        uintArray.forEach((byte) => {
          bytes += byte.toString(16).padStart(2, '0');
        });
        const allowedTypes = fileType.split(',').map((type) => type.trim());
        for (const allowedType of allowedTypes) {
          const signatures = fileSignatures[allowedType];
          if (signatures && signatures.some((signature) => bytes.startsWith(signature))) {
            resolve(true);
            return;
          }
        }
        resolve(false);
      }
    };
    reader.readAsArrayBuffer(file);
  });
  return result;
};

export const getFileIcon = (fileType: string): React.ReactNode => {
  if (fileType in fileTypeIcons) {
    return fileTypeIcons[fileType];
  } else {
    return fileTypeIcons['any'];
  }
};
