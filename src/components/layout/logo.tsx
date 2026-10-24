import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8 shrink-0", className)} aria-hidden="true">
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="#1c1915" stroke="currentColor" strokeOpacity="0.22" />
      <path d="M7 22.25h18" stroke="#f6f3ec" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 22.25a6 6 0 0 1 12 0" stroke="#e8a06a" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="16" cy="12.35" r="1.35" fill="#e8a06a" />
    </svg>
  );
}

export function Logo({ className, variant = "serif" }: { className?: string; variant?: "serif" | "sans" }) {
  return (
    <Link href="/" aria-label="Surubata" className={cn("inline-flex items-center gap-2.5 rounded-md text-foreground", className)}>
      {variant === "serif" ? <LogoMark /> : null}
      <span className={cn(variant === "sans" ? "logo-sans text-[1.45rem] sm:text-[1.6rem]" : "logo-word text-[1.55rem] sm:text-[1.7rem]")} aria-hidden="true">
        <span>Suru</span>
        <span className={variant === "sans" ? "bata" : "-ml-[0.045em] text-accent"}>bata</span>
      </span>
    </Link>
  );
}
