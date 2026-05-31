import { isSameDay, isWithinInterval } from 'date-fns';
import type { DateRange, DayRangeState, TimeSelection } from './types';

/** Color de marca Sincroday. */
export const BRAND = '#510085';

/** Parsea "HH:mm" a [horas, minutos]. Devuelve [0, 0] si es inválido. */
function parseTime(time: string): [number, number] {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!match) return [0, 0];
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return [0, 0];
  return [hours, minutes];
}

/** Une una fecha (Y-M-D) con "HH:mm" en un Date local nuevo. */
export function combineDateTime(date: Date, time: string): Date {
  const [hours, minutes] = parseTime(time);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

/** Devuelve el estado del día respecto del rango (para pintar la grilla). */
export function getDayRangeState(date: Date, range: DateRange): DayRangeState {
  const { start, end } = range;
  if (start && isSameDay(date, start)) return 'start';
  if (end && isSameDay(date, end)) return 'end';
  if (start && end && isWithinInterval(date, { start, end })) return 'in-range';
  return 'none';
}

/** Formatea "HH:mm" a "9:00 am" según el locale. */
function formatTimeLabel(time: string, locale: string): string {
  const [hours, minutes] = parseTime(time);
  const probe = new Date();
  probe.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(probe);
}

/**
 * "Event: 14 - 20 de julio, de 9:00 am a 10:00 am" (formateado por locale).
 * Si falta alguna fecha, devuelve cadena vacía.
 */
export function buildSummary(
  range: DateRange,
  times: TimeSelection,
  locale: string,
): string {
  const { start, end } = range;
  if (!start || !end) return '';

  const dayMonth = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
  });
  const dayOnly = new Intl.DateTimeFormat(locale, { day: 'numeric' });

  const sameMonth =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth();

  const datePart = isSameDay(start, end)
    ? dayMonth.format(start)
    : sameMonth
      ? `${dayOnly.format(start)} - ${dayMonth.format(end)}`
      : `${dayMonth.format(start)} - ${dayMonth.format(end)}`;

  const from = formatTimeLabel(times.startTime, locale);
  const to = formatTimeLabel(times.endTime, locale);

  return `Event: ${datePart}, de ${from} a ${to}`;
}