import { BRAND } from '../utils';

interface AINotesToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

/** Toggle accesible (role="switch") para habilitar las notas con IA. */
export function AINotesToggle({ checked, onChange }: AINotesToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <span id="ai-notes-label" className="text-sm font-medium text-gray-700">
        Enable AI notes
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby="ai-notes-label"
        onClick={() => onChange(!checked)}
        className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          backgroundColor: checked ? BRAND : '#d1d5db',
          '--tw-ring-color': BRAND,
        } as React.CSSProperties}
      >
        <span
          className="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform"
          style={{ transform: checked ? 'translateX(22px)' : 'translateX(2px)' }}
        />
      </button>
    </div>
  );
}