import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">BotDawn</p>
      <h1 className="font-display mt-4 text-4xl">This page is not on the shelf.</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">यो पृष्ठ भेटिएन।</p>
      <div className="mt-8 flex gap-4 text-sm font-medium">
        <Link href="/ne" className="underline underline-offset-4">
          BotDawn नेपालीमा
        </Link>
        <Link href="/en" className="underline underline-offset-4">
          BotDawn in English
        </Link>
      </div>
    </main>
  );
}
