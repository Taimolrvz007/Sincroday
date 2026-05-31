interface DateTimeFieldProps {
  label: string;
  /** Fecha en formato "yyyy-MM-dd" para <input type="date">, o "" si no hay. */
  dateValue: string;
  /** Hora en formato "HH:mm". */
  timeValue: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
}

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1';

/** Campo combinado: etiqueta + input de fecha + input de hora. */
export function DateTimeField({
  label,
  dateValue,
  timeValue,
  onDateChange,
  onTimeChange,
}: DateTimeFieldProps) {
  const ringStyle = { '--tw-ring-color': '#510085' } as React.CSSProperties;

  return (
    <fieldset className="space-y-1.5">
      <legend className="text-sm font-medium text-gray-700">
        {label}
        <span className="text-red-500" aria-hidden="true">
          *
        </span>
      </legend>
      <div className="flex gap-2">
        <input
          type="date"
          required
          aria-label={`${label} fecha`}
          value={dateValue}
          onChange={(e) => onDateChange(e.target.value)}
          className={`w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 ${FOCUS_RING}`}
          style={ringStyle}
        />
        <input
          type="time"
          required
          aria-label={`${label} hora`}
          value={timeValue}
          onChange={(e) => onTimeChange(e.target.value)}
          className={`w-28 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 ${FOCUS_RING}`}
          style={ringStyle}
        />
      </div>
    </fieldset>
  );
}