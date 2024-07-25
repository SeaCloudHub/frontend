import { create } from 'zustand';

export type FileUploadState = {
  filekey: string;
  fileName: string;
  progress: number;
  success: boolean;
};

type ProgressIndicatorState = {
  filesUploaded: FileUploadState[];
  setFileNames: (newFiles: FileUploadState[]) => void;
  updateFileProgress: (filekey: string, progress: number) => void;
  setFileSuccess: (filekey: string, success: boolean) => void;
  reset: () => void;
};

export const useProgressIndicator = create<ProgressIndicatorState>((set) => ({
  filesUploaded: [],
  setFileNames: (newFiles: FileUploadState[]) =>
    set((state) => ({
      filesUploaded: [...state.filesUploaded, ...newFiles],
    })),
  updateFileProgress: (filekey: string, progress: number) =>
    set((state) => ({
      filesUploaded: state.filesUploaded.map((file) => (file.filekey === filekey ? { ...file, progress } : file)),
    })),
  setFileSuccess: (filekey: string, success: boolean) =>
    set((state) => ({
      filesUploaded: state.filesUploaded.map((file) =>
        file.filekey === filekey ? { ...file, success, progress: success ? 100 : 0 } : file,
      ),
    })),
  reset: () =>
    set(() => ({
      filesUploaded: [],
    })),
}));
