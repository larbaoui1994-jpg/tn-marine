"use client";

import { useEffect, useRef, useState } from "react";
import MuteToggleButton from "./MuteToggleButton";

const PLAYLIST = [
  "/videos/eagle-simplicity.mp4",
  "/videos/eagle-gills.mp4",
  "/videos/eagle-instinct.mp4",
  "/videos/eagle-monsters.mp4",
  "/videos/eagle-fish-wont-wait.mp4",
];

export default function EagleVideoPlaylist() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const isFirstRender = useRef(true);
  // Empêche un second déclenchement de "ended" d'avancer deux fois la
  // playlist avant que la piste suivante n'ait réellement démarré.
  const advancing = useRef(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {
      advancing.current = false;
    });
  }, [index]);

  const handleEnded = () => {
    if (advancing.current) return;
    advancing.current = true;
    setIndex((i) => (i + 1) % PLAYLIST.length);
  };

  const handlePlaying = () => {
    advancing.current = false;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div className="mt-4">
      <div
        className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl bg-black"
        onClick={toggleMute}
      >
        <video
          ref={videoRef}
          className="h-full w-full"
          playsInline
          autoPlay
          muted
          preload="auto"
          onEnded={handleEnded}
          onPlaying={handlePlaying}
        >
          <source src={PLAYLIST[index]} type="video/mp4" />
        </video>
        <MuteToggleButton muted={muted} />
      </div>
      <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
        {PLAYLIST.map((src, i) => (
          <span
            key={src}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === index ? "bg-secondary" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
