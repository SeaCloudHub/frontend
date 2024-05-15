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
  arrSelected: string[];
  setArrSelected: (arrSelected: string[]) => void;
};

export const useSelected = create<ArrSelectedState>((set) => ({
  arrSelected: [],
  setArrSelected: (arrSelected: string[]) => set({ arrSelected }),
}));

export type ListEntriesState = {
  listEntries: LocalEntry[];
  listSuggestedEntries: SuggestedEntry[];
  searchEntries: SuggestedEntry[];
  submited: boolean;
  setListEntries: Dispatch<SetStateAction<LocalEntry[]>>;
  setListSuggestedEntries: Dispatch<SetStateAction<SuggestedEntry[]>>;
  setSearchEntries: Dispatch<SetStateAction<SuggestedEntry[]>>;
  resetEntries: () => void;
  setSubmited: (isSubmited: boolean) => void;
};

export const useEntries = create<ListEntriesState>((set) => ({
  listEntries: [],
  listSuggestedEntries: [],
  searchEntries: [],
  submited: false,
  setListEntries: (listEntries: SuggestedEntry[]) => set({ listEntries }),
  setListSuggestedEntries: (listSuggestedEntries: SuggestedEntry[]) => set({ listSuggestedEntries }),
  setSearchEntries: (searchEntries: SuggestedEntry[]) => set({ searchEntries }),
  resetEntries: () => set({ listEntries: [], listSuggestedEntries: [], searchEntries: [] }),
  setSubmited: (isSubmited: boolean) => set({ submited: isSubmited }),
}));

export type LimitState = {
  limit: number
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