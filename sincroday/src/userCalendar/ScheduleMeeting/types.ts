/** Día de la semana: 0 = domingo … 6 = sábado (convención date-fns). */
export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Rango de fechas (sin hora). null = aún no elegido. */
export interface DateRange {
  start: Date | null;
  end: Date | null;
}

/** Horas en formato "HH:mm" (24h, como devuelve <input type="time">). */
export interface TimeSelection {
  startTime: string; // p.ej. "09:00"
  endTime: string; // p.ej. "10:00"
}

/** Lo que recibe onSchedule: fechas ya combinadas con su hora. */
export interface SchedulePayload {
  start: Date; // combineDateTime(range.start, startTime)
  end: Date; // combineDateTime(range.end, endTime)
  aiNotes: boolean;
}

/** Día renderizable de la grilla. */
export interface CalendarDay {
  date: Date;
  inCurrentMonth: boolean; // false => se pinta gris
  isToday: boolean;
}

/** Estado de un día respecto del rango seleccionado. */
export type DayRangeState = 'none' | 'start' | 'end' | 'in-range';

/** Props públicas del componente. */
export interface ScheduleMeetingProps {
  onSchedule: (payload: SchedulePayload) => void;
  onCancel?: () => void;
  initialRange?: DateRange;
  initialTimes?: TimeSelection; // default { startTime: "09:00", endTime: "10:00" }
  initialAiNotes?: boolean; // default false
  locale?: string; // default "es-AR"
  weekStartsOn?: WeekDay; // default 1 (lunes)
}