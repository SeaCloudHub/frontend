import { LocalEntry } from '@/hooks/drive.hooks';
import { FileShareRole } from '@/utils/types/file-share-role.type';
import { create } from 'zustand';

type FileShareProps = {
  fileInfo: LocalEntry | null;
  role: FileShareRole | null;
  setFileInfo: (file: LocalEntry, role: FileShareRole) => void;
  getFileInfo: () => LocalEntry | null;
};

export const useSharedFileInfo = create<FileShareProps>()((set, get) => ({
  fileInfo: null,
  role: null,
  setFileInfo: (file: LocalEntry, role: FileShareRole) =>
    set(() => ({
      fileInfo: file,
      role: role,
    })),
  getFileInfo: () => get().fileInfo,
}));
