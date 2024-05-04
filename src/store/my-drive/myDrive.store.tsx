import React from 'react';
import { create } from 'zustand';

type DrawerState = {
  drawerOpen: boolean;
  entryId?: string;
  icon?: React.ReactNode;
  title?: string;
  openDrawer: (entryId?: string, icon?: React.ReactNode, title?: string) => void;
  closeDrawer: () => void;
};

type ViewModeState = {
  viewMode: string;
  setViewMode: (mode: string) => void;
};

export type Path = {
  id: string;
  name: string;
}[];

export const useDrawer = create<DrawerState>()((set) => ({
  drawerOpen: false,
  openDrawer: (entryId?: string, icon?: React.ReactNode, title?: string) => {
    set({ drawerOpen: true, entryId, icon, title });
  },
  closeDrawer: () => set({ drawerOpen: false }),
}));

export const useViewMode = create<ViewModeState>((set) => ({
  viewMode: 'grid',
  setViewMode: (mode: string) => set({ viewMode: mode }),
}));

export type ArrSelectedState = {
  arrSelected: string[];
  setArrSelected: (arrSelected: string[]) => void;
};

export const useSelected = create<ArrSelectedState>((set) => ({
  arrSelected: [],
  setArrSelected: (arrSelected: string[]) => set({ arrSelected }),
}));
