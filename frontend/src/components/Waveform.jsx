import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, Volume2, RotateCcw, AlertCircle } from 'lucide-react';

export default function Waveform({ audioUrl, segments = [], onSegmentClick }) {
  const containerRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioUrl || !containerRef.current) return;

    try {
      const ws = WaveSurfer.create({
        container: containerRef.current,
        waveColor: '#475569',
        progressColor: 'var(--color-primary)',
        cursorColor: '#f8fafc',
        barWidth: 3,
        barGap: 2,
        barRadius: 2,
        height: 80,
        responsive: true,
      });

      wavesurferRef.current = ws;
      ws.load(audioUrl);

      ws.on('ready', () => {
        setDuration(ws.getDuration());
      });

      ws.on('audioprocess', () => {
        setCurrentTime(ws.getCurrentTime());
      });

      ws.on('play', () => setIsPlaying(true));
      ws.on('pause', () => setIsPlaying(false));
      ws.on('finish', () => setIsPlaying(false));

      return () => {
        ws.destroy();
      };
    } catch (e) {
      console.warn("WaveSurfer initialization skipped or unsupported URL", e);
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  const restartPlay = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.seekTo(0);
      wavesurferRef.current.play();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!audioUrl) {
    return (
      <div className="bg-theme-surface rounded-2xl p-6 sm:p-8 border border-theme-border shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-theme-text flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-theme-primary" />
            <span>Interactive Speech Waveform</span>
          </h3>
          <span className="text-xs bg-theme-surface-card px-2.5 py-1 rounded-full text-theme-muted border border-theme-border">
            WaveSurfer.js Engine
          </span>
        </div>
        <div className="h-32 border-2 border-dashed border-theme-border rounded-xl flex flex-col items-center justify-center text-center p-6 bg-theme-surface-card/50">
          <Volume2 className="w-8 h-8 text-theme-muted mb-2 opacity-60" />
          <p className="text-sm font-medium text-theme-muted">
            Upload a recording to view the waveform.
          </p>
          <p className="text-xs text-theme-muted/70 mt-1">
            WaveSurfer regions will highlight detected flaw intervals (12.4s – 16.1s, 31.2s – 33.5s, 45s – 58s).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-theme-surface rounded-2xl p-6 border border-theme-border shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-theme-text flex items-center space-x-2">
          <Volume2 className="w-4 h-4 text-theme-primary" />
          <span>Speech Waveform & Grounded Flaws</span>
        </h3>
        <div className="text-xs text-theme-muted font-mono">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      <div ref={containerRef} className="w-full bg-theme-surface-card rounded-lg p-2 mb-4" />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlay}
            className="p-2.5 rounded-xl bg-theme-primary hover:bg-theme-primary-hover text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={restartPlay}
            className="p-2.5 rounded-xl bg-theme-surface-card hover:bg-theme-surface text-theme-muted hover:text-theme-text border border-theme-border transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Region jumps */}
        {segments.length > 0 && (
          <div className="flex items-center space-x-2 overflow-x-auto py-1">
            <span className="text-xs text-theme-muted hidden sm:inline">Jump to flaw:</span>
            {segments.map((seg) => (
              <button
                key={seg.id}
                onClick={() => {
                  if (wavesurferRef.current && duration > 0) {
                    wavesurferRef.current.seekTo(seg.start / duration);
                  }
                  if (onSegmentClick) onSegmentClick(seg);
                }}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  seg.severity === 'HIGH' ? 'badge-high' :
                  seg.severity === 'MEDIUM' ? 'badge-medium' : 'badge-low'
                }`}
              >
                {seg.start}s ({seg.type.replace('_', ' ')})
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
