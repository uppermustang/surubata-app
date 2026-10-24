export default function Loading() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div role="status" aria-live="polite" className="max-w-xl space-y-4">
        <span className="sr-only">लोड हुँदैछ / Loading</span>
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
        <div className="h-12 w-4/5 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
      </div>
    </main>
  );
}
