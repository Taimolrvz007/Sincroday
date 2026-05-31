import { BRAND } from '../utils';

interface ScheduleFooterProps {
  /** Resumen ya formateado, o "" para mostrar un placeholder. */
  summary: string;
  canSchedule: boolean;
  onCancel: () => void;
  onSchedule: () => void;
}

/** Pie con divider: resumen a la izquierda, botones a la derecha. */
export function ScheduleFooter({
  summary,
  canSchedule,
  onCancel,
  onSchedule,
}: ScheduleFooterProps) {
  return (
    <footer className="flex flex-col gap-4 border-t border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <p className="text-sm text-gray-600">
        {summary || 'Selecciona un rango de fechas para ver el resumen.'}
      </p>

      <div className="flex shrink-0 gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ '--tw-ring-color': BRAND } as React.CSSProperties}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSchedule}
          disabled={!canSchedule}
          className="rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
          style={{ backgroundColor: BRAND, '--tw-ring-color': BRAND } as React.CSSProperties}
        >
          Schedule
        </button>
      </div>
    </footer>
  );
}