import React from 'react';
import { AlertTriangle, Clock, Gauge, ChevronRight } from 'lucide-react';

export default function SegmentList({ segments = [], onSelectSegment, selectedSegmentId }) {
  // Sort by start timestamp
  const sortedSegments = [...segments].sort((a, b) => a.start - b.start);

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

  const getMetricUnit = (type) => {
    if (type === 'TOO_FAST' || type === 'TOO_SLOW') return 'WPM';
    if (type === 'LONG_PAUSE') return 's';
    if (type === 'MONOTONE') return 'semitones';
    return '';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-theme-text">Detected Speech Issues</h3>
          <p className="text-sm text-theme-muted">
            Temporally grounded flaws compared against ideal speech delivery standards.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-theme-surface-card border border-theme-border text-theme-muted">
          {segments.length} issues found
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedSegments.map((segment) => {
          const isSelected = selectedSegmentId === segment.id;
          const unit = getMetricUnit(segment.type);

          return (
            <div
              key={segment.id}
              className={`bg-theme-surface rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'border-theme-primary ring-2 ring-theme-primary/30 shadow-lg'
                  : 'border-theme-border hover:border-theme-primary/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${getSeverityBadgeClass(
                      segment.severity
                    )}`}
                  >
                    {segment.severity}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-theme-muted font-mono">
                    <Clock className="w-3.5 h-3.5 text-theme-muted" />
                    <span>
                      {segment.start}s – {segment.end}s
                    </span>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-theme-text mb-1">
                  {formatFlawType(segment.type)}
                </h4>

                <div className="text-xs text-theme-muted mb-3 flex items-center space-x-2 bg-theme-surface-card px-2.5 py-1.5 rounded-lg border border-theme-border/60">
                  <Gauge className="w-3.5 h-3.5 text-theme-primary" />
                  <span>
                    Measured: <strong className="text-theme-text">{segment.measured} {unit}</strong>
                  </span>
                  <span>•</span>
                  <span>Ref: {segment.reference} {unit}</span>
                </div>

                <p className="text-xs text-theme-muted line-clamp-2 mb-4 leading-relaxed">
                  "{segment.explanation}"
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectSegment(segment)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 transition-all ${
                  isSelected
                    ? 'bg-theme-primary text-white'
                    : 'bg-theme-surface-card hover:bg-theme-primary/20 text-theme-text border border-theme-border'
                }`}
              >
                <span>{isSelected ? 'Viewing Details' : 'View Details'}</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
