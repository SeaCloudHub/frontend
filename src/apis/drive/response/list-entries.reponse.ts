import { EntryRESP } from "./entry.response";

export type ListEntriesRESP = {
  entries: EntryRESP[];
  cursor: string;
};