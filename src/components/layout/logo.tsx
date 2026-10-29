import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function Logo({ className, variant = "sans" }: { className?: string; variant?: "serif" | "sans" }) {
  return (
    <Link href="/" aria-label="BotDawn" className={cn("inline-flex items-center gap-2.5 rounded-md text-foreground", className)}>
      <Image
        src="/brand/botdawn-mark.png"
        alt=""
        width={40}
        height={56}
        priority
        unoptimized
        className="h-12 w-9 shrink-0 object-contain sm:h-14 sm:w-10 dark:invert dark:hue-rotate-180"
      />
      <span className={cn(variant === "sans" ? "logo-sans text-xl sm:text-[1.6rem]" : "logo-word text-[1.35rem] sm:text-[1.7rem]")} aria-hidden="true">
        <span>Bot</span>
        <span className={variant === "sans" ? "dawn" : "-ml-[0.045em] text-accent"}>Dawn</span>
      </span>
    </Link>
  );
}
