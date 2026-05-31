import { useMemo, useState } from 'react';
import { addMonths, format, parse, startOfMonth } from 'date-fns';
import type { ScheduleMeetingProps, TimeSelection } from './types';
import { useDateRange } from './hooks/useDateRange';
import { useCalendarMatrix } from './hooks/useCalendarMatrix';
import { buildSummary, combineDateTime } from './utils';
import { MeetingHeader } from './components/MeetingHeader';
import { MonthNavigator } from './components/MonthNavigator';
import { CalendarGrid } from './components/CalendarGrid';
import { DateTimeField } from './components/DateTimeField';
import { AINotesToggle } from './components/AINotesToggle';
import { ScheduleFooter } from './components/ScheduleFooter';

const DEFAULT_TIMES: TimeSelection = { startTime: '09:00', endTime: '10:00' };
const ISO_DATE = 'yyyy-MM-dd';

/** Card date-range picker de Sincroday (estilo Calendly). */
export function ScheduleMeeting({
  onSchedule,
  onCancel,
  initialRange,
  initialTimes = DEFAULT_TIMES,
  initialAiNotes = false,
  locale = 'es-AR',
  weekStartsOn = 1,
}: ScheduleMeetingProps) {
  const { range, selectDate, setEndpoint, reset } = useDateRange(initialRange);
  const [times, setTimes] = useState<TimeSelection>(initialTimes);
  const [aiNotes, setAiNotes] = useState<boolean>(initialAiNotes);
  const [visibleMonth, setVisibleMonth] = useState<Date>(
    startOfMonth(initialRange?.start ?? new Date()),
  );

  const { weeks, weekdayLabels } = useCalendarMatrix(
    visibleMonth,
    weekStartsOn,
    locale,
  );

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
      }).format(visibleMonth),
    [locale, visibleMonth],
  );

  const summary = useMemo(
    () => buildSummary(range, times, locale),
    [range, times, locale],
  );

  // El foco de la grilla: start del rango si existe, si no el mes visible.
  const focusDate = range.start ?? visibleMonth;

  const toDateInput = (date: Date | null) => (date ? format(date, ISO_DATE) : '');

  // Editar la fecha desde el input mueve el extremo correspondiente del rango.
  const handleDateInput = (which: 'start' | 'end', value: string) => {
    if (!value) return;
    const parsed = parse(value, ISO_DATE, new Date());
    setVisibleMonth(startOfMonth(parsed));
    setEndpoint(which, parsed);
  };

  const canSchedule = Boolean(range.start && range.end);

  const handleSchedule = () => {
    if (!range.start || !range.end) return;
    onSchedule({
      start: combineDateTime(range.start, times.startTime),
      end: combineDateTime(range.end, times.endTime),
      aiNotes,
    });
  };

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
        <MeetingHeader />

        <div className="grid grid-cols-1 gap-8 px-6 py-6 sm:px-8 md:grid-cols-2">
          {/* Columna izquierda: calendario */}
          <section aria-label="Calendario de selección">
            <MonthNavigator
              label={monthLabel}
              onPrev={() => setVisibleMonth((m) => addMonths(m, -1))}
              onNext={() => setVisibleMonth((m) => addMonths(m, 1))}
            />
            <CalendarGrid
              weeks={weeks}
              weekdayLabels={weekdayLabels}
              range={range}
              focusDate={focusDate}
              onSelect={selectDate}
              onFocusMove={(date) => setVisibleMonth(startOfMonth(date))}
            />
          </section>

          {/* Columna derecha: campos y toggle */}
          <section aria-label="Detalles de la reunión" className="space-y-5">
            <DateTimeField
              label="Start date"
              dateValue={toDateInput(range.start)}
              timeValue={times.startTime}
              onDateChange={(v) => handleDateInput('start', v)}
              onTimeChange={(v) => setTimes((t) => ({ ...t, startTime: v }))}
            />
            <DateTimeField
              label="End date"
              dateValue={toDateInput(range.end)}
              timeValue={times.endTime}
              onDateChange={(v) => handleDateInput('end', v)}
              onTimeChange={(v) => setTimes((t) => ({ ...t, endTime: v }))}
            />
            <AINotesToggle checked={aiNotes} onChange={setAiNotes} />
          </section>
        </div>

        <ScheduleFooter
          summary={summary}
          canSchedule={canSchedule}
          onCancel={handleCancel}
          onSchedule={handleSchedule}
        />
      </div>
    </div>
  );
}
