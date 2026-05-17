import { useSyncExternalStore } from "react";

export type Staff = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
  archivedAt?: string;
};

const initialActive: Staff[] = [
  { id: "S001", name: "Dr. Sarah Chen", email: "sarah@ayagdental.com", role: "admin", status: "active", joined: "2023-01-15" },
  { id: "S002", name: "Dr. Mike Johnson", email: "mike@ayagdental.com", role: "admin", status: "active", joined: "2023-03-20" },
  { id: "S003", name: "Nurse Amy Lee", email: "amy@ayagdental.com", role: "admin", status: "active", joined: "2023-06-10" },
  { id: "S004", name: "Receptionist Jen Cruz", email: "jen@ayagdental.com", role: "admin", status: "on-leave", joined: "2023-09-01" },
];

let active: Staff[] = [...initialActive];
let archived: Staff[] = [];

const listeners = new Set<() => void>();
const emit = () => listeners.forEach(l => l());
const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };

export function archiveStaff(id: string) {
  const s = active.find(x => x.id === id);
  if (!s) return;
  active = active.filter(x => x.id !== id);
  archived = [{ ...s, archivedAt: new Date().toISOString().slice(0, 10) }, ...archived];
  emit();
}

export function restoreStaff(id: string) {
  const s = archived.find(x => x.id === id);
  if (!s) return;
  archived = archived.filter(x => x.id !== id);
  const { archivedAt, ...rest } = s;
  active = [...active, rest];
  emit();
}

export function useActiveStaff() {
  return useSyncExternalStore(subscribe, () => active, () => active);
}

export function useArchivedStaff() {
  return useSyncExternalStore(subscribe, () => archived, () => archived);
}
