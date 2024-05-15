import { LocalEntry } from '@/hooks/drive.hooks';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type StorageState = {
  rootId: string;
  storageUsage: number;
  storageCapacity: number;
  update: (usage: number, capacity: number, rootId: string) => void;
};

export const useStorageStore = create<StorageState>()(
  devtools(
    persist(
      (set) => ({
        rootId: '',
        storageUsage: 0,
        storageCapacity: 0,
        update: (usage: number, capacity: number, rootid: string) =>
          set((state) => ({ ...state, storageUsage: usage, storageCapacity: capacity, rootId: rootid })),
      }),
      {
        name: 'storageStore',
        version: 1,
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: 'storageStore', enabled: true },
  ),
);
