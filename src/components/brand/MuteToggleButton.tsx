interface MuteToggleButtonProps {
  muted: boolean;
}

// Icône seule (pas de <button> : le clic est géré par le conteneur vidéo
// parent pour que toute la zone vidéo soit cliquable, pas juste l'icône).
export default function MuteToggleButton({ muted }: MuteToggleButtonProps) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
    >
      {muted ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinejoin="round" />
          <path d="m23 9-6 6M17 9l6 6" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinejoin="round" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}
