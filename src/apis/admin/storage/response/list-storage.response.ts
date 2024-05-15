import { EntryRESP, PageInfoRESP } from '@/apis/drive/drive.response';

export type ListStoragesRESP = {
  pagination: PageInfoRESP;
  user_root_directories: EntryRESP[];
};
