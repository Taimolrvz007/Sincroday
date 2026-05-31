import { useCallback, useState } from 'react';
import { isAfter, isBefore } from 'date-fns';
import type { DateRange } from '../types';

const EMPTY_RANGE: DateRange = { start: null, end: null };

export interface UseDateRange {
  range: DateRange;
  /** 1º click = start, 2º = end (swap si va antes), 3º = reinicia. */
  selectDate: (date: Date) => void;
  /** Fija un extremo concreto del rango (edición directa por input). */
  setEndpoint: (which: 'start' | 'end', date: Date) => void;
  reset: () => void;
}

/**
 * Maneja la selección de un rango con la mecánica de tres clicks:
 * - sin start (o con rango completo previo) → setea start
 * - con start y sin end → setea end, intercambiando si la fecha es anterior
 */
export function useDateRange(initial?: DateRange): UseDateRange {
  const [range, setRange] = useState<DateRange>(initial ?? EMPTY_RANGE);

  const selectDate = useCallback((date: Date) => {
    setRange((current) => {
      const { start, end } = current;

      // 3er click (rango completo) o estado vacío → reinicia con nuevo start.
      if (!start || end) {
        return { start: date, end: null };
      }

      // 2do click → cierra el rango, con swap si va antes del start.
      return isBefore(date, start)
        ? { start: date, end: start }
        : { start, end: date };
    });
  }, []);

  const setEndpoint = useCallback((which: 'start' | 'end', date: Date) => {
    setRange((current) => {
      if (which === 'start') {
        // Si el nuevo inicio queda después del fin, el fin se descarta.
        const end = current.end && isAfter(date, current.end) ? null : current.end;
        return { start: date, end };
      }
      // which === 'end': si va antes del inicio, intercambia.
      if (current.start && isBefore(date, current.start)) {
        return { start: date, end: current.start };
      }
      return { start: current.start, end: date };
    });
  }, []);

  const reset = useCallback(() => setRange(EMPTY_RANGE), []);

  return { range, selectDate, setEndpoint, reset };
}