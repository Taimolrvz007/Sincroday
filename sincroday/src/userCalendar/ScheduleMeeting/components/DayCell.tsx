import type { CalendarDay, DayRangeState } from '../types';
import { BRAND } from '../utils';

interface DayCellProps {
  day: CalendarDay;
  state: DayRangeState;
  /** true si esta celda es la que recibe foco con Tab dentro de la grilla. */
  isFocusTarget: boolean;
  onSelect: (date: Date) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>, date: Date) => void;
  registerRef: (date: Date, el: HTMLButtonElement | null) => void;
}

const BRAND_TINT = 'rgba(81, 0, 133, 0.1)'; // #510085 al 10%

/** Estilos inline por estado (los colores de marca no son utilidades Tailwind). */
function styleFor(state: DayRangeState): React.CSSProperties {
  switch (state) {
    case 'start':
    case 'end':
      return { backgroundColor: BRAND, color: '#ffffff' };
    case 'in-range':
      return { backgroundColor: BRAND_TINT, color: BRAND };
    default:
      return {};
  }
}

/** Celda de día. role="gridcell" con un botón interactivo dentro. */
export function DayCell({
  day,
  state,
  isFocusTarget,
  onSelect,
  onKeyDown,
  registerRef,
}: DayCellProps) {
  const { date, inCurrentMonth, isToday } = day;
  const selected = state === 'start' || state === 'end';

  const base =
    'flex h-9 w-9 items-center justify-center rounded-full text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1';
  const tone =
    state === 'none'
      ? inCurrentMonth
        ? 'text-gray-800 hover:bg-gray-100'
        : 'text-gray-300 hover:bg-gray-50'
      : 'font-semibold';
  const todayRing = isToday && state === 'none' ? 'ring-1 ring-gray-200' : '';

  return (
    <div role="gridcell" aria-selected={selected} className="p-0.5">
      <button
        type="button"
        ref={(el) => registerRef(date, el)}
        tabIndex={isFocusTarget ? 0 : -1}
        onClick={() => onSelect(date)}
        onKeyDown={(e) => onKeyDown(e, date)}
        aria-current={isToday ? 'date' : undefined}
        aria-label={date.toLocaleDateString('es-AR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
        className={`${base} ${tone} ${todayRing}`}
        style={{ ...styleFor(state), '--tw-ring-color': BRAND } as React.CSSProperties}
      >
        {date.getDate()}
      </button>
    </div>
  );
}