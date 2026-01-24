import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Capsule Corp TCG. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Owner Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
