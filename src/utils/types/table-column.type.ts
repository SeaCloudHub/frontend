export type Column<T> = {
  id: Exclude<keyof T, 'action'>; // Exclude 'action' from the keyof T
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  width?: number;
};
