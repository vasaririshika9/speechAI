import React from 'react';
import { X, AlertCircle, HelpCircle, Lightbulb, Compass, BarChart2 } from 'lucide-react';

export default function SegmentDetail({ segment, onClose }) {
  if (!segment) return null;

  const getMetricUnit = (type) => {
    if (type === 'TOO_FAST' || type === 'TOO_SLOW') return 'WPM';
    if (type === 'LONG_PAUSE') return 's';
    if (type === 'MONOTONE') return 'semitones';
    return '';
  };

  const getSeverityBadgeClass = (severity) => {
    switch (severity?.toUpperCase()) {
      case 'HIGH':
        return 'badge-high';
      case 'MEDIUM':
        return 'badge-medium';
      case 'LOW':
      default:
        return 'badge-low';
    }
  };

  const formatFlawType = (type) => {
    return type
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const unit = getMetricUnit(segment.type);

  return (
    <div className="bg-theme-surface rounded-2xl p-6 sm:p-8 border border-theme-border shadow-xl relative animate-in fade-in duration-200">
      <div className="flex items-start justify-between pb-4 border-b border-theme-border/60">
        <div className="flex items-center space-x-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${getSeverityBadgeClass(segment.severity)}`}>
            {segment.severity} SEVERITY
          </span>
          <h3 className="text-xl font-bold text-theme-text">
            {formatFlawType(segment.type)} Deep Dive
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-theme-muted hover:text-theme-text hover:bg-theme-surface-card rounded-lg transition-colors"
            title="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* WHAT & WHERE */}
        <div className="space-y-4">
          <div className="bg-theme-surface-card rounded-xl p-4 border border-theme-border">
            <span className="text-xs font-bold uppercase tracking-wider text-theme-primary flex items-center space-x-1.5 mb-1">
              <AlertCircle className="w-4 h-4" />
              <span>WHAT</span>
            </span>
            <p className="text-base font-semibold text-theme-text">
              {segment.explanation}
            </p>
          </div>

          <div className="bg-theme-surface-card rounded-xl p-4 border border-theme-border">
            <span className="text-xs font-bold uppercase tracking-wider text-theme-secondary flex items-center space-x-1.5 mb-1">
              <Compass className="w-4 h-4" />
              <span>WHERE</span>
            </span>
            <p className="text-base font-semibold text-theme-text font-mono">
              {segment.start}s – {segment.end}s <span className="text-xs text-theme-muted font-sans font-normal">(Duration: {(segment.end - segment.start).toFixed(1)}s)</span>
            </p>
          </div>

          {/* EVIDENCE & REFERENCE */}
          <div className="bg-theme-surface-card rounded-xl p-4 border border-theme-border flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-theme-muted flex items-center space-x-1.5 mb-1">
                <BarChart2 className="w-3.5 h-3.5 text-theme-warning" />
                <span>EVIDENCE</span>
              </span>
              <p className="text-lg font-bold text-theme-text">
                {segment.measured} {unit}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-theme-muted mb-1 block">
                REFERENCE TARGET
              </span>
              <p className="text-lg font-bold text-theme-success">
                {segment.reference} {unit}
              </p>
            </div>
          </div>
        </div>

        {/* WHY & HOW TO IMPROVE */}
        <div className="space-y-4">
          <div className="bg-theme-surface-card rounded-xl p-4 border border-theme-border">
            <span className="text-xs font-bold uppercase tracking-wider text-theme-warning flex items-center space-x-1.5 mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>WHY THIS MATTERS</span>
            </span>
            <p className="text-sm text-theme-muted leading-relaxed">
              {segment.type === 'TOO_FAST' && "Speaking significantly faster than the reference standard reduces listener comprehension and diminishes the perceived weight of key ideas."}
              {segment.type === 'LONG_PAUSE' && "Unusually long silent intervals disrupt narrative rhythm and can cause listeners to perceive hesitation or loss of train of thought."}
              {segment.type === 'MONOTONE' && "Flat pitch variance fails to signpost critical concepts, causing cognitive fatigue and reduced engagement from listeners."}
              {!['TOO_FAST', 'LONG_PAUSE', 'MONOTONE'].includes(segment.type) && "Acoustic divergence from natural speech patterns impacts clarity and listener engagement."}
            </p>
          </div>

          <div className="bg-theme-surface-card rounded-xl p-4 border border-theme-border border-l-4 border-l-theme-success">
            <span className="text-xs font-bold uppercase tracking-wider text-theme-success flex items-center space-x-1.5 mb-1">
              <Lightbulb className="w-4 h-4" />
              <span>HOW TO IMPROVE</span>
            </span>
            <p className="text-sm font-medium text-theme-text leading-relaxed">
              {segment.recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
