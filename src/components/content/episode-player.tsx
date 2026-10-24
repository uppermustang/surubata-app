"use client";

import { Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { CoverImage } from "@/components/content/cover-image";
import { formatClock } from "@/lib/format";
import type { EpisodeView } from "@/types/views";

export function EpisodePlayer({ episode }: { episode: EpisodeView }) {
  const t = useTranslations("episode");
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [startAt, setStartAt] = useState(0);
  const canPlay = Boolean(episode.youtubeId || episode.videoUrl);

  function seek(seconds: number) {
    setActive(seconds);
    if (episode.videoUrl || episode.youtubeId) {
      setStartAt(seconds);
      setShowVideo(true);
    }
    window.setTimeout(() => {
      const video = videoRef.current;
      if (video && episode.videoUrl) {
        video.currentTime = seconds;
        void video.play();
      }
    }, 60);
    if (audioRef.current && episode.audioUrl) {
      audioRef.current.currentTime = seconds;
      void audioRef.current.play();
      setPlaying(true);
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-neutral-950 text-white">
        {showVideo && episode.youtubeId ? (
          <iframe
            key={`${episode.youtubeId}-${startAt}`}
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${episode.youtubeId}?rel=0&start=${startAt}&autoplay=1`}
            title={episode.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            {episode.image ? (
              <CoverImage src={episode.image.src} alt={episode.image.alt} sizes="(min-width: 768px) 720px, 100vw" />
            ) : null}
            {showVideo && episode.videoUrl ? (
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src={episode.videoUrl}
                poster={episode.image?.src}
                controls
                autoPlay
                playsInline
              />
            ) : null}
            {canPlay && !showVideo ? (
              <button type="button" onClick={() => setShowVideo(true)} className="absolute inset-0 flex items-center justify-center bg-black/15" aria-label={t("playVideo")}>
                <span className="inline-flex size-16 items-center justify-center rounded-full bg-white text-neutral-950 shadow-lg">
                  <Play className="ml-1 size-7" fill="currentColor" aria-hidden />
                </span>
              </button>
            ) : null}
            {!showVideo ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-5 pt-16 pb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">{episode.series}</p>
                <p className="font-display mt-2 max-w-xl text-2xl leading-tight sm:text-4xl">{episode.title}</p>
                {!canPlay ? <p className="mt-3 max-w-md text-sm text-white/80">{t("videoMissing")}</p> : null}
              </div>
            ) : null}
          </>
        )}
      </div>
      {episode.sample ? <p className="text-sm leading-relaxed text-muted-foreground">{t("sampleNote")}</p> : null}

      {episode.audioUrl ? (
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("audioLabel")}</p>
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              aria-label={playing ? t("pause") : t("play")}
              onClick={() => {
                const audio = audioRef.current;
                if (!audio) return;
                if (audio.paused) {
                  void audio.play();
                  setPlaying(true);
                } else {
                  audio.pause();
                  setPlaying(false);
                }
              }}
              className="inline-flex size-11 items-center justify-center rounded-full bg-foreground text-background"
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
            <audio
              ref={audioRef}
              src={episode.audioUrl}
              preload="none"
              className="w-full"
              controls
              aria-label={t("seek")}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
          </div>
        </div>
      ) : null}

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("timestamps")}</h2>
        <ol className="mt-3 divide-y divide-border rounded-xl border border-border">
          {episode.timestamps.map((item) => (
            <li key={item.seconds}>
              <button
                type="button"
                onClick={() => seek(item.seconds)}
                aria-current={active === item.seconds ? "true" : undefined}
                className="flex w-full items-baseline gap-4 px-4 py-3 text-left hover:bg-highlight"
              >
                <span className="w-12 shrink-0 font-mono text-sm text-accent">{formatClock(item.seconds)}</span>
                <span className="text-sm sm:text-base">{item.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
