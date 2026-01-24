export function Logo() {
  return (
    <div className="flex items-center gap-2">
       <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100V0Z" fill="hsl(var(--primary))"/>
        <path d="M50 0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100V0Z" fill="hsl(var(--accent))"/>
        <circle cx="50" cy="50" r="25" fill="hsl(var(--background))" />
        <circle cx="50" cy="50" r="10" fill="hsl(var(--foreground))" />
      </svg>
      <span className="font-logo text-xl font-bold tracking-tighter text-foreground">
        Capsule Corp TCG
      </span>
    </div>
  );
}
