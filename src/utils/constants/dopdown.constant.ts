import { FileOperation, StrorageType } from '../enums/dropdown.enum';
import { DropdownItems } from '../types/drop-down.type';

export const storageTypes: DropdownItems = [
  { value: StrorageType.FILE, label: 'File' },
  { value: StrorageType.FOLDER, label: 'Folder' },
];

export const fileTypes: DropdownItems = [
  { value: 'docx', label: 'dox' },
  { value: 'pdf', label: 'pdf' },
];

export const fileOperations: DropdownItems = [
  { value: FileOperation.LASTMODIFIED, label: 'Last Opened' },
  { value: FileOperation.LASTOPENED, label: 'Last Modified' },
];
