import React from 'react';
import {
  FileText,
  Activity,
  Layers,
  Search,
  Clock,
  HelpCircle,
  TrendingUp,
  Cpu,
  Database,
  ShieldCheck
} from 'lucide-react';

export default function About() {
  const steps = [
    {
      num: 1,
      title: 'Transcribe Speech',
      desc: 'Accurate word-level timestamped transcription using faster-whisper to map words to exact audio frames.',
      icon: FileText,
    },
    {
      num: 2,
      title: 'Extract Acoustic Features',
      desc: 'Signal processing using librosa and Parselmouth for fundamental frequency (F0/pitch), pauses, silence distributions, and RMS vocal energy.',
      icon: Activity,
    },
    {
      num: 3,
      title: 'Compare Against Reference',
      desc: 'Contrastive comparison against high-quality reference speech benchmarks to evaluate deviations in cadence and dynamics.',
      icon: Layers,
    },
    {
      num: 4,
      title: 'Detect Delivery Flaws',
      desc: 'Pattern recognition targeting fast pacing (>180 WPM), sluggish pacing (<110 WPM), monotone delivery, awkward pauses, and excessive vocal fillers.',
      icon: Search,
    },
    {
      num: 5,
      title: 'Temporal Grounding',
      desc: 'Grounding anomalies to precise millisecond intervals so users can hear and inspect the exact flawed intervals.',
      icon: Clock,
    },
    {
      num: 6,
      title: 'Explain the Problem',
      desc: 'Contextual synthesis explaining WHY the anomaly detracts from communication effectiveness.',
      icon: HelpCircle,
    },
    {
      num: 7,
      title: 'Recommend Improvements',
      desc: 'Actionable speech coaching exercises to iteratively refine public speaking, pitching, and presentation delivery.',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-text">About Speech Diagnosis</h1>
        <p className="text-base sm:text-lg text-theme-muted max-w-2xl mx-auto">
          Speech Diagnosis is an AI-powered speech analysis system designed to move beyond a simple speech score by diagnosing delivery root causes with temporal precision.
        </p>
      </div>

      {/* 7-Step Pipeline */}
      <section className="bg-theme-surface rounded-2xl p-6 sm:p-8 border border-theme-border shadow-lg">
        <h2 className="text-xl font-bold text-theme-text mb-6 flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-theme-primary" />
          <span>7-Step Comprehensive Speech Pipeline</span>
        </h2>

        <div className="space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="flex items-start space-x-4 p-4 rounded-xl bg-theme-surface-card border border-theme-border/60 hover:border-theme-primary/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-theme-primary/10 flex items-center justify-center text-theme-primary font-bold shrink-0 text-sm">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-theme-text flex items-center space-x-2">
                    <span>{step.title}</span>
                  </h3>
                  <p className="text-xs text-theme-muted mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Development Roadmap Note */}
      <section className="bg-theme-surface rounded-2xl p-6 border border-theme-border flex items-start space-x-4">
        <div className="p-3 bg-theme-warning/10 rounded-xl text-theme-warning shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="text-sm">
          <h3 className="font-bold text-theme-text mb-1">Development Phase Note (Day 1)</h3>
          <p className="text-theme-muted leading-relaxed">
            This Day 1 deployment establishes the architectural foundation, contract specifications, and user interface. Deep ML models (faster-whisper, wav2vec 2.0, librosa, and Parselmouth) will be integrated in subsequent phases to transition from mock diagnostics to real-time inference.
          </p>
        </div>
      </section>
    </div>
  );
}
