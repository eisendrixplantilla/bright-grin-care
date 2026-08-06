import { format } from "date-fns";

export interface DentistSchedule {
  name: string;
  workingDays: number[]; // 0 = Sunday
  start: string;
  end: string;
  lunchStart: string;
  lunchEnd: string;
  duration: number; // minutes
  maxPatientsPerDay: number;
  leave: string[]; // yyyy-MM-dd
  booked: Record<string, string[]>; // yyyy-MM-dd -> ["09:00", ...]
}

export const toKey = (d: Date) => format(d, "yyyy-MM-dd");

const dayKey = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return toKey(d);
};

export const dentistSchedules: DentistSchedule[] = [
  {
    name: "Dr. Ayag",
    workingDays: [1, 2, 3, 4, 5],
    start: "09:00",
    end: "17:00",
    lunchStart: "12:00",
    lunchEnd: "13:00",
    duration: 30,
    maxPatientsPerDay: 10,
    leave: [dayKey(3)],
    booked: { [dayKey(1)]: ["09:00", "09:30", "13:00"] },
  },
  {
    name: "Dr. Santos",
    workingDays: [1, 3, 5],
    start: "10:00",
    end: "16:00",
    lunchStart: "12:00",
    lunchEnd: "13:00",
    duration: 30,
    maxPatientsPerDay: 6,
    leave: [],
    booked: { [dayKey(2)]: ["10:00", "10:30"] },
  },
  {
    name: "Dr. Reyes",
    workingDays: [2, 4, 6],
    start: "09:00",
    end: "15:00",
    lunchStart: "11:30",
    lunchEnd: "12:30",
    duration: 45,
    maxPatientsPerDay: 5,
    leave: [dayKey(5)],
    booked: {},
  },
  {
    name: "Dr. Cruz",
    workingDays: [1, 2, 3, 4, 5, 6],
    start: "08:00",
    end: "14:00",
    lunchStart: "11:00",
    lunchEnd: "12:00",
    duration: 60,
    maxPatientsPerDay: 4,
    leave: [],
    booked: { [dayKey(1)]: ["08:00"] },
  },
];

export const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export const toLabel = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
};

export const toValue = (mins: number) =>
  `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;

export function generateSlots(
  schedule: DentistSchedule | undefined,
  date: Date | undefined,
): { value: string; label: string }[] {
  if (!schedule || !date) return [];
  const key = toKey(date);
  if (schedule.leave.includes(key)) return [];
  if (!schedule.workingDays.includes(date.getDay())) return [];

  const booked = schedule.booked[key] ?? [];
  if (booked.length >= schedule.maxPatientsPerDay) return [];

  const remaining = schedule.maxPatientsPerDay - booked.length;
  const slots: { value: string; label: string }[] = [];
  const endMin = toMinutes(schedule.end);
  const lunchStart = toMinutes(schedule.lunchStart);
  const lunchEnd = toMinutes(schedule.lunchEnd);
  const now = new Date();
  const isToday = toKey(now) === key;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  for (let t = toMinutes(schedule.start); t + schedule.duration <= endMin; t += schedule.duration) {
    const slotEnd = t + schedule.duration;
    if (t < lunchEnd && slotEnd > lunchStart) continue;
    const value = toValue(t);
    if (booked.includes(value)) continue;
    if (isToday && t <= nowMinutes) continue;
    slots.push({ value, label: toLabel(t) });
  }

  return slots.slice(0, remaining);
}
