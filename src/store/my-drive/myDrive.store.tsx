import { TypeEntry } from '@/apis/drive/drive.request';
import { EntryRESP, SuggestedEntriesRESP } from '@/apis/drive/drive.response';
import { LocalEntry, SuggestedEntry } from '@/hooks/drive.hooks';
import React, { Dispatch, LegacyRef, MutableRefObject, SetStateAction, useRef } from 'react';
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
  arrSelected: {id: string; isDir: boolean}[];
  setArrSelected: (arrSelected: {id: string; isDir: boolean}[]) => void;
};

export const useSelected = create<ArrSelectedState>((set) => ({
  arrSelected: [],
  setArrSelected: (arrSelected: {id: string; isDir: boolean}[]) => set({ arrSelected }),
}));

export type ListEntriesState = {
  listEntries: LocalEntry[];
  listSuggestedEntries: SuggestedEntry[];
  searchEntries: SuggestedEntry[];
  setListEntries: Dispatch<SetStateAction<LocalEntry[]>>;
  setListSuggestedEntries: Dispatch<SetStateAction<SuggestedEntry[]>>;
  setSearchEntries: Dispatch<SetStateAction<SuggestedEntry[]>>;
  resetEntries: () => void;
};

export const useEntries = create<ListEntriesState>((set) => ({
  listEntries: [],
  listSuggestedEntries: [],
  searchEntries: [],
  setListEntries: (listEntries: SuggestedEntry[]) => set({ listEntries }),
  setListSuggestedEntries: (listSuggestedEntries: SuggestedEntry[]) => set({ listSuggestedEntries }),
  setSearchEntries: (searchEntries: SuggestedEntry[]) => set({ searchEntries }),
  resetEntries: () => set({ listEntries: [], listSuggestedEntries: [], searchEntries: [] }),
}));

export type LimitState = {
  limit: number;
  increaseLimit: () => void;
  resetLimit: () => void;
};

export const useLimit = create<LimitState>((set) => ({
  limit: 15,
  increaseLimit: () => set((state) => ({ limit: state.limit + 15 })),
  resetLimit: () => set({ limit: 15 }),
}));

export type TypeFilterState = {
  typeFilter: TypeEntry;
  setTypeFilter: (type: TypeEntry) => void;
};

export const useTypeFilter = create<TypeFilterState>((set) => ({
  typeFilter: '',
  setTypeFilter: (type: TypeEntry) => set({ typeFilter: type }),
}));

export type EntryModeState = {
  isFileMode: boolean;
  setIsFileMode: (isFileMode: boolean) => void;
};

export const useIsFileMode = create<EntryModeState>((set) => ({
  isFileMode: true,
  setIsFileMode: (isFileMode: boolean) => set({ isFileMode }),
}));
