import React from 'react';

export type DropdownItem = {
  label: string;
  value: string;
  disabled?: boolean;
  preIcon?: React.ReactNode;
};

export type DropdownItems = DropdownItem[];
