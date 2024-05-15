import dayjs from 'dayjs';
import { FileAction } from '../enums/file.enum';

export type StorageLogDto = {
  date: string;
  username: string;
  action: FileAction;
  fileName: string;
};
