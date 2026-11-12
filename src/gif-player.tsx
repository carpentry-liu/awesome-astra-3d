/* oxlint-disable next/no-img-element -- Keep original GIF bytes and attribution. */
import { useEffect, useState } from 'react';
import type { AnimatedGif, Locale } from './catalog';
import { messages } from './i18n';

export function useGifPlayback() {
  // Keep SSR and hydration identical; start motion once the visitor's preference is known.
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPlaying(!preference.matches);
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);
  return [playing, setPlaying] as const;
}

export function GifPlayer({
  gif,
  poster,
  title,
  locale,
}: {
  gif: AnimatedGif;
  poster: string | null;
  title: string;
  locale: Locale;
}) {
  const [playing, setPlaying] = useGifPlayback();
  const [failed, setFailed] = useState(false);
  const t = messages[locale];
  return (
    <div className="gif-player">
      {playing ? (
        <img
          key="animation"
          src={gif.url}
          alt={title}
          width={gif.width}
          height={gif.height}
          referrerPolicy="no-referrer"
          onError={() => {
            setPlaying(false);
            setFailed(true);
          }}
        />
      ) : poster ? (
        <img
          key="poster"
          onError={() => setFailed(true)}
          src={poster}
          alt={title}
          width={gif.width}
          height={gif.height}
          referrerPolicy="no-referrer"
        />
      ) : null}
      <div className="gif-controls">
        <button
          aria-pressed={playing}
          onClick={() => {
            setFailed(false);
            setPlaying(!playing);
          }}
        >
          {playing ? t.gifStop : t.gifPlay}
        </button>
        <span>
          {gif.frames} {t.gifFrames} · {gif.durationMs / 1000}s · {gif.width} ×{' '}
          {gif.height}
        </span>
      </div>
      {failed && <output>{t.gifFailed}</output>}
    </div>
  );
}
