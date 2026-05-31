import { BRAND } from '../utils';

/** Encabezado: avatar con ícono de reloj + título y subtítulo, con divider. */
export function MeetingHeader() {
  return (
    <header className="border-b border-gray-100 px-6 py-5 sm:px-8">
      <div className="flex items-center gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: BRAND }}
          aria-hidden="true"
        >
          <ClockIcon />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Schedule a meeting
          </h2>
          <p className="text-sm text-gray-500">
            Create your next meeting easily.
          </p>
        </div>
      </div>
    </header>
  );
}

function ClockIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}