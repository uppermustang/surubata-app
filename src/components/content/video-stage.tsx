"use client";

import { Play } from "lucide-react";
import { useRef, useState } from "react";
import { CoverImage } from "@/components/content/cover-image";

export function VideoStage({
  title,
  poster,
  posterAlt = "",
  videoUrl,
  youtubeId,
  playLabel,
  note,
}: {
  title: string;
  poster?: string;
  posterAlt?: string;
  videoUrl?: string;
  youtubeId?: string;
  playLabel: string;
  note?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const canPlay = Boolean(videoUrl || youtubeId);

  function start() {
    if (!canPlay) return;
    setPlaying(true);
    window.setTimeout(() => {
      void videoRef.current?.play();
    }, 0);
  }

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-neutral-950 text-white shadow-[0_18px_50px_-28px_rgba(0,0,0,0.7)]">
      <div className="relative aspect-video">
        {playing && youtubeId ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            {poster ? (
              <CoverImage src={poster} alt={posterAlt} sizes="(min-width: 1024px) 720px, 100vw" />
            ) : (
              <div className="absolute inset-0 bg-neutral-900" />
            )}
            {playing && videoUrl ? (
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src={videoUrl}
                poster={poster}
                controls
                playsInline
                autoPlay
              />
            ) : null}
            {canPlay && !playing ? (
              <button
                type="button"
                onClick={start}
                className="absolute inset-0 flex items-center justify-center bg-black/15"
                aria-label={playLabel}
              >
                <span className="inline-flex size-16 items-center justify-center rounded-full bg-white text-neutral-950 shadow-lg">
                  <Play className="ml-1 size-7" fill="currentColor" aria-hidden />
                </span>
              </button>
            ) : null}
            {!playing ? (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-4 pt-16 pb-4">
                <span className="font-display block text-2xl leading-tight sm:text-3xl">{title}</span>
              </span>
            ) : null}
          </>
        )}
      </div>
      {note ? <figcaption className="px-4 py-3 text-sm leading-relaxed text-white/80">{note}</figcaption> : null}
    </figure>
  );
}
