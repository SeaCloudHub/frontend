import React from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
    console.log(useDrawer.getState());
  },
  closeDrawer: () => set({ drawerOpen: false }),
}));

export const useViewMode = create<ViewModeState>((set) => ({
  viewMode: 'grid',
  setViewMode: (mode: string) => set({ viewMode: mode }),
}));

type RootIdState = {
  rootId: string | null;
  setRootId: (rootId: string) => void;
};

export const useRootId = create<RootIdState>()(
  persist(
    (set) => ({
      rootId: null,
      setRootId: (rootId: string) => set({ rootId }),
    }),
    { name: 'root-id' },
  ),
);
