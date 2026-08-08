"use client";

import { useRef, useState } from "react";
import MuteToggleButton from "./MuteToggleButton";

interface HeroVideoProps {
  src: string;
}

export default function HeroVideo({ src }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div className="relative mx-auto aspect-video w-full max-w-7xl cursor-pointer bg-black" onClick={toggleMute}>
      <video ref={videoRef} className="h-full w-full" playsInline loop autoPlay muted preload="auto">
        <source src={src} type="video/mp4" />
      </video>
      <MuteToggleButton muted={muted} />
    </div>
  );
}
