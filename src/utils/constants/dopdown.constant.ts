import { StrorageType } from '../enums/dropdown.enum';
import { DropdownItems } from '../types/drop-down.type';

export const storageTypes: DropdownItems = [
  { value: StrorageType.FILE, label: 'File' },
  { value: StrorageType.FOLDER, label: 'Folder' },
];

export const fileTypes: DropdownItems = [
  { value: 'docx', label: 'dox' },
  { value: 'pdf', label: 'pdf' },
];
