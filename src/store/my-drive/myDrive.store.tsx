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

export const useDrawer = create<DrawerState>()((set) => ({
  drawerOpen: false,
  openDrawer: (entryId?: string, icon?: React.ReactNode, title?: string) => set({ drawerOpen: true, entryId, icon, title }),
  closeDrawer: () => set({ drawerOpen: false }),
}));

// read local storage here
export const useViewMode = create((set) => ({
  viewMode: 'grid',
  setViewMode: (mode: string) => set({ viewMode: mode }),
}));

type CwdState = {
  icon: React.ReactNode;
  title: string;
  setCwd: (icon: React.ReactNode, title: string) => void;
};

export const useCwd = create<CwdState>((set) => ({
  icon: <></>,
  title: '',
  setCwd: (icon: React.ReactNode, title: string) => set({ icon, title }),
}));