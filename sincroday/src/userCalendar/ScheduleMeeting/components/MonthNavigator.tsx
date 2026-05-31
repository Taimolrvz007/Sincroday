interface MonthNavigatorProps {
  /** Etiqueta ya formateada, p.ej. "julio 2026". */
  label: string;
  onPrev: () => void;
  onNext: () => void;
}

/** Navegación de mes: ‹ Mes Año ›. */
export function MonthNavigator({ label, onPrev, onNext }: MonthNavigatorProps) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <NavButton label="Mes anterior" onClick={onPrev}>
        ‹
      </NavButton>
      <span className="text-sm font-semibold capitalize text-gray-900">
        {label}
      </span>
      <NavButton label="Mes siguiente" onClick={onNext}>
        ›
      </NavButton>
    </div>
  );
}

interface NavButtonProps {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}

function NavButton({ label, onClick, children }: NavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{ '--tw-ring-color': '#510085' } as React.CSSProperties}
    >
      {children}
    </button>
  );
}