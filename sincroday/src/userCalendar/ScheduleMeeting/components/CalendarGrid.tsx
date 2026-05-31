import { useCallback, useRef } from 'react';
import { addDays, isSameDay } from 'date-fns';
import type { CalendarDay, DateRange } from '../types';
import { getDayRangeState } from '../utils';
import { DayCell } from './DayCell';

interface CalendarGridProps {
  weeks: CalendarDay[][];
  weekdayLabels: string[];
  range: DateRange;
  /** Día que debe recibir el foco con Tab (start del rango, o today, o el 1º). */
  focusDate: Date;
  onSelect: (date: Date) => void;
  /** Pide al contenedor mover el mes visible si el foco sale de la grilla. */
  onFocusMove: (date: Date) => void;
}

/** Grilla accesible role="grid" con navegación por teclado tipo datepicker. */
export function CalendarGrid({
  weeks,
  weekdayLabels,
  range,
  focusDate,
  onSelect,
  onFocusMove,
}: CalendarGridProps) {
  const refs = useRef(new Map<string, HTMLButtonElement>());

  const key = (d: Date) => d.toDateString();

  const registerRef = useCallback(
    (date: Date, el: HTMLButtonElement | null) => {
      if (el) refs.current.set(key(date), el);
      else refs.current.delete(key(date));
    },
    [],
  );

  const focusDay = useCallback((date: Date) => {
    const el = refs.current.get(key(date));
    if (el) el.focus();
    else onFocusMove(date); // el día cayó fuera del mes visible
  }, [onFocusMove]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, date: Date) => {
      let next: Date | null = null;
      switch (event.key) {
        case 'ArrowLeft':
          next = addDays(date, -1);
          break;
        case 'ArrowRight':
          next = addDays(date, 1);
          break;
        case 'ArrowUp':
          next = addDays(date, -7);
          break;
        case 'ArrowDown':
          next = addDays(date, 7);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          onSelect(date);
          return;
        default:
          return;
      }
      event.preventDefault();
      onFocusMove(next);
      // Esperamos al re-render para enfocar el día destino.
      requestAnimationFrame(() => focusDay(next!));
    },
    [focusDay, onFocusMove, onSelect],
  );

  return (
    <div role="grid" aria-label="Calendario" className="select-none">
      <div role="row" className="mb-1 grid grid-cols-7">
        {weekdayLabels.map((label) => (
          <div
            key={label}
            role="columnheader"
            className="py-1 text-center text-xs font-medium capitalize text-gray-400"
          >
            {label}
          </div>
        ))}
      </div>

      {weeks.map((week) => (
        <div role="row" key={key(week[0].date)} className="grid grid-cols-7">
          {week.map((day) => (
            <DayCell
              key={key(day.date)}
              day={day}
              state={getDayRangeState(day.date, range)}
              isFocusTarget={isSameDay(day.date, focusDate)}
              onSelect={onSelect}
              onKeyDown={handleKeyDown}
              registerRef={registerRef}
            />
          ))}
        </div>
      ))}
    </div>
  );
}