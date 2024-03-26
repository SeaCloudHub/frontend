export type Column<T> = {
  id: Exclude<keyof T, 'action'>; // Exclude 'action' from the keyof T
  label: React.ReactNode;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  width?: number | string;
  noneSort?: boolean;
};
