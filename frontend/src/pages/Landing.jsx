import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  Activity,
  AlertTriangle,
  Clock,
  HelpCircle,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function Landing() {
  const steps = [
    { title: 'Speech', desc: 'Audio recording input', icon: Mic },
    { title: 'Analyze', desc: 'Acoustic feature extraction', icon: Activity },
    { title: 'Detect Flaws', desc: 'Contrastive comparison', icon: AlertTriangle },
    { title: 'Exact Timestamp', desc: 'Sub-second grounding', icon: Clock },
    { title: 'Explain', desc: 'Root cause insights', icon: HelpCircle },
    { title: 'Improve', desc: 'Targeted coaching drills', icon: TrendingUp },
  ];

  const pillars = [
    {
      label: 'WHAT',
      question: 'What went wrong?',
      description: 'Pinpoints specific acoustic issues like rushing cadence (205 WPM), long hesitation pauses, or flat monotone pitch.',
      badgeClass: 'badge-low',
    },
    {
      label: 'WHERE',
      question: 'Where did it happen?',
      description: 'Grounds every detected issue to exact audio timestamps (e.g., 12.4s – 16.1s) so you can review the exact moment.',
      badgeClass: 'badge-medium',
    },
    {
      label: 'WHY',
      question: 'Why does it matter?',
      description: 'Explains the psychoacoustic impact on your audience—such as cognitive fatigue, perceived hesitation, or diminished clarity.',
      badgeClass: 'badge-high',
    },
    {
      label: 'HOW',
      question: 'How can you improve?',
      description: 'Provides actionable, concrete coaching recommendations tailored to fix the specific delivery flaw.',
      badgeClass: 'badge-low',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-theme-surface-card border border-theme-border text-xs font-semibold text-theme-primary mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-theme-primary" />
          <span>Contrastive Speech Analytics & Temporal Flaw Grounding</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-theme-text mb-6 leading-tight">
          Speech Diagnosis
        </h1>

        <p className="text-lg sm:text-2xl text-theme-muted max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          Don't just get a speech score. Find exactly where and why your delivery needs improvement.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/analyze"
            id="landing-analyze-cta"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white bg-theme-primary hover:bg-theme-primary-hover shadow-lg shadow-theme-primary/25 flex items-center justify-center space-x-2 transition-all text-base"
          >
            <span>Analyze My Speech</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-medium text-theme-text bg-theme-surface hover:bg-theme-surface/80 border border-theme-border transition-colors text-base"
          >
            How It Works
          </a>
        </div>
      </section>

      {/* Core Workflow Concept */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-theme-text">The Diagnostic Workflow</h2>
          <p className="text-sm text-theme-muted mt-2">
            Moving past arbitrary scores into deterministic, temporally grounded speech feedback.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="bg-theme-surface rounded-xl p-4 border border-theme-border text-center flex flex-col items-center justify-between relative group hover:border-theme-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-theme-primary/10 flex items-center justify-center text-theme-primary mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-theme-muted mb-1">0{idx + 1}</div>
                <h3 className="text-sm font-bold text-theme-text mb-1">{step.title}</h3>
                <p className="text-xs text-theme-muted">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4 Diagnostic Pillars: WHAT, WHERE, WHY, HOW */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-theme-text">
            Four Dimensions of Speech Grounding
          </h2>
          <p className="text-sm text-theme-muted mt-2">
            Every flaw detected by our system is answered across four actionable dimensions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.label}
              className="bg-theme-surface rounded-2xl p-6 border border-theme-border shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${pillar.badgeClass}`}>
                    {pillar.label}
                  </span>
                  <span className="text-xs text-theme-muted font-semibold">{pillar.question}</span>
                </div>
                <h3 className="text-lg font-bold text-theme-text mb-2">{pillar.question}</h3>
                <p className="text-sm text-theme-muted leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-theme-surface rounded-3xl p-8 sm:p-12 border border-theme-border shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-theme-text mb-4">
            Ready to inspect your speech delivery?
          </h2>
          <p className="text-sm sm:text-base text-theme-muted max-w-xl mx-auto mb-8">
            Test the Day 1 prototype with instant mock analysis and explore how contrastive analytics pinpoint communication flaws.
          </p>
          <Link
            to="/analyze"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-theme-primary hover:bg-theme-primary-hover transition-all"
          >
            <span>Start Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
