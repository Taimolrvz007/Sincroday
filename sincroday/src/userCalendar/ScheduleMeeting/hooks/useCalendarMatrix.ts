import { useMemo } from 'react';
import {
  addDays,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import type { CalendarDay, WeekDay } from '../types';

const TOTAL_CELLS = 42; // 6 filas × 7 columnas

export interface UseCalendarMatrix {
  weeks: CalendarDay[][]; // siempre 6 × 7
  weekdayLabels: string[]; // ["lun", …, "dom"] según locale/weekStartsOn
}

/** Construye la grilla 6×7 del mes visible más las etiquetas de día. */
export function useCalendarMatrix(
  visibleMonth: Date,
  weekStartsOn: WeekDay = 1,
  locale = 'es-AR',
): UseCalendarMatrix {
  return useMemo(() => {
    const monthStart = startOfMonth(visibleMonth);
    const gridStart = startOfWeek(monthStart, { weekStartsOn });

    const days: CalendarDay[] = Array.from({ length: TOTAL_CELLS }, (_, i) => {
      const date = addDays(gridStart, i);
      return {
        date,
        inCurrentMonth: isSameMonth(date, monthStart),
        isToday: isToday(date),
      };
    });

    const weeks: CalendarDay[][] = [];
    for (let i = 0; i < TOTAL_CELLS; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    const labelFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const weekdayLabels = Array.from({ length: 7 }, (_, i) =>
      labelFormatter.format(addDays(gridStart, i)),
    );

    return { weeks, weekdayLabels };
  }, [visibleMonth, weekStartsOn, locale]);
}