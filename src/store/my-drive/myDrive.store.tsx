import { TypeEntry } from '@/apis/drive/drive.request';
import { EntryRESP, LocalActivityLog, SuggestedEntriesRESP } from '@/apis/drive/drive.response';
import { LocalEntry, SuggestedEntry } from '@/hooks/drive.hooks';
import { TimeEntry } from '@/pages/user/trash/trash-page-view/DriveHistoryGridView';
import { UserRole } from '@/utils/types/user-role.type';
import React, { Dispatch, LegacyRef, MutableRefObject, SetStateAction, useRef } from 'react';
import { create } from 'zustand';

type DrawerState = {
  drawerOpen: boolean;
  entryId?: string;
  icon?: React.ReactNode;
  title?: string;
  tab?: 'Details' | 'Activity';
  openDrawer: (entryId?: string, icon?: React.ReactNode, title?: string) => void;
  closeDrawer: () => void;
  setTab: (tab: 'Details' | 'Activity') => void;
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
  tab: 'Details',
  openDrawer: (entryId?: string, icon?: React.ReactNode, title?: string) => {
    set({ drawerOpen: true, entryId, icon, title });
  },
  closeDrawer: () => set({ drawerOpen: false }),
  setTab: (tab: 'Details' | 'Activity') => set({ tab }),
}));

export const useViewMode = create<ViewModeState>((set) => ({
  viewMode: 'grid',
  setViewMode: (mode: string) => set({ viewMode: mode }),
}));

export type SelectedType = { id: string; isDir: boolean; userRoles: UserRole[] };

export type ArrSelectedState = {
  arrSelected: SelectedType[];
  setArrSelected: (arrSelected: SelectedType[]) => void;
};

export const useSelected = create<ArrSelectedState>((set) => ({
  arrSelected: [],
  setArrSelected: (arrSelected: SelectedType[]) => set({ arrSelected }),
}));

export type ListEntriesState = {
  listEntries: LocalEntry[];
  listSuggestedEntries: SuggestedEntry[];
  entriesSearchPage: SuggestedEntry[];
  trashEntries: TimeEntry[];
  folderEntries: LocalEntry[];
  setListEntries: Dispatch<SetStateAction<LocalEntry[]>>;
  setListSuggestedEntries: Dispatch<SetStateAction<SuggestedEntry[]>>;
  setEntriesSearchPage: Dispatch<SetStateAction<SuggestedEntry[]>>;
  setTrashEntries: Dispatch<SetStateAction<TimeEntry[]>>;
  setFolderEntries: Dispatch<SetStateAction<LocalEntry[]>>;
  resetEntries: () => void;
  getNameById: (id: string) => string;
};

export const useEntries = create<ListEntriesState>((set, get) => ({
  listEntries: [],
  listSuggestedEntries: [],
  trashEntries: [],
  entriesSearchPage: [],
  folderEntries: [],
  setListEntries: (listEntries: LocalEntry[]) => set({ listEntries }),
  setListSuggestedEntries: (listSuggestedEntries: SuggestedEntry[]) => set({ listSuggestedEntries }),
  setTrashEntries: (trashEntries: TimeEntry[]) => set({ trashEntries }),
  setEntriesSearchPage: (entriesSearchPage: SuggestedEntry[]) => set({ entriesSearchPage }),
  setFolderEntries: (folderEntries: LocalEntry[]) => set({ folderEntries }),
  resetEntries: () => set({ listEntries: [], listSuggestedEntries: [], trashEntries: [], entriesSearchPage: [], folderEntries: [] }),
  getNameById: (id: string) => {
    const entry = get().listEntries.find((entry) => entry.id === id) || get().listSuggestedEntries.find((entry) => entry.id === id) || get().entriesSearchPage.find((entry) => entry.id === id);
    return entry ? entry.title : '';
  },
}));

export type CursorState = {
  nextCursor: string;
  currentCursor: string;
  setNextCursor: (cursor: string) => void;
  setCurrentCursor: (cursor: string) => void;
  resetCursor: () => void;
};

export const useCursor = create<CursorState>((set) => ({
  
  nextCursor: '',
  currentCursor: '',
  setNextCursor: (cursor: string) => set({ nextCursor: cursor }),
  setCurrentCursor: (cursor: string) => set({ currentCursor: cursor }),
  resetCursor: () => set({ nextCursor: '', currentCursor: '' }),
}));

export type CursorActivityState = {
  nextCursorActivity: string;
  currentCursorActivity: string;
  setNextCursorActivity: (cursor: string) => void;
  setCurrentCursorActivity: (cursor: string) => void;
  resetCursorActivity: () => void;
};

export const useCursorActivity = create<CursorActivityState>((set) => ({
  nextCursorActivity: '',
  currentCursorActivity: '',
  setNextCursorActivity: (cursor: string) => set({ nextCursorActivity: cursor }),
  setCurrentCursorActivity: (cursor: string) => set({ currentCursorActivity: cursor }),
  resetCursorActivity: () => set({ nextCursorActivity: '', currentCursorActivity: '' }),
}));

export type CursorSearchState = {
  nextCursorSearch: string;
  currentCursorSearch: string;
  setNextCursorSearch: (cursor: string) => void;
  setCurrentCursorSearch: (cursor: string) => void;
  resetCursorSearch: () => void;
};

export const useCursorSearch = create<CursorSearchState>((set) => ({
  nextCursorSearch: '',
  currentCursorSearch: '',
  setNextCursorSearch: (cursor: string) => set({ nextCursorSearch: cursor }),
  setCurrentCursorSearch: (cursor: string) => set({ currentCursorSearch: cursor }),
  resetCursorSearch: () => set({ nextCursorSearch: '', currentCursorSearch: '' }),
}));

export type FilterState = {
  typeFilter: TypeEntry;
  modifiedFilter: string;
  setTypeFilter: (type: TypeEntry) => void;
  setModifiedFilter: (modified: string) => void;
  resetFilter: () => void;
};

export const useFilter = create<FilterState>((set) => ({
  typeFilter: '',
  modifiedFilter: '',
  setTypeFilter: (type: TypeEntry) => set({ typeFilter: type }),
  setModifiedFilter: (modified: string) => set({ modifiedFilter: modified }),
  resetFilter: () => set({ typeFilter: '', modifiedFilter: '' }),
}));

export type EntryModeState = {
  isFileMode: boolean;
  setIsFileMode: (isFileMode: boolean) => void;
};

export const useIsFileMode = create<EntryModeState>((set) => ({
  isFileMode: true,
  setIsFileMode: (isFileMode: boolean) => set({ isFileMode }),
}));

export type ActivityLogState = {
  activityLog: LocalActivityLog;
  limitActivities: number;
  setActivityLog: (activityLog: LocalActivityLog) => void;
  increaseLimitActivities: () => void;
  resetLimit: () => void;
};

export const useActivityLogStore = create<ActivityLogState>((set) => ({
  activityLog: [],
  limitActivities: 15,
  setActivityLog: (activityLog: LocalActivityLog) => set({ activityLog }),
  increaseLimitActivities: () => set((state) => ({ limitActivities: state.limitActivities + 15 })),
  resetLimit: () => set({ limitActivities: 15 }),
}));
