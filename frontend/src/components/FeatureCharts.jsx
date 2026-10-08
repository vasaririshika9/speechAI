import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import { Activity, BarChart3, TrendingUp, Info } from 'lucide-react';

export default function FeatureCharts({ features }) {
  // Mock data for Day 1 visualizations
  const speechRateData = [
    { label: 'Measured', value: features?.speech_rate?.average_wpm || 158, fill: 'var(--color-primary)' },
    { label: 'Reference Target', value: features?.speech_rate?.reference_wpm || 145, fill: 'var(--color-success)' },
  ];

  const pitchContourData = [
    { time: '0s', userF0: 175, refF0: 170 },
    { time: '10s', userF0: 190, refF0: 180 },
    { time: '20s', userF0: 205, refF0: 175 },
    { time: '30s', userF0: 180, refF0: 185 },
    { time: '40s', userF0: 185, refF0: 180 },
    { time: '50s', userF0: 182, refF0: 190 },
    { time: '60s', userF0: 178, refF0: 175 },
  ];

  const energyContourData = [
    { time: '0s', energy: 0.55 },
    { time: '10s', energy: 0.72 },
    { time: '20s', energy: 0.68 },
    { time: '30s', energy: 0.40 },
    { time: '40s', energy: 0.65 },
    { time: '50s', energy: 0.62 },
    { time: '60s', energy: 0.58 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-xl font-bold text-theme-text flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-theme-primary" />
            <span>Acoustic Feature Profiles</span>
          </h3>
          <p className="text-sm text-theme-muted">
            Comparative telemetry across speech velocity, pitch variance, and vocal energy.
          </p>
        </div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-theme-surface-card border border-theme-warning/40 text-xs text-theme-warning font-medium">
          <Info className="w-3.5 h-3.5" />
          <span>Demo / Mock Feature Telemetry</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Speech Rate Comparison */}
        <div className="bg-theme-surface rounded-2xl p-5 border border-theme-border shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-theme-text flex items-center space-x-1.5">
                <TrendingUp className="w-4 h-4 text-theme-primary" />
                <span>Speech Velocity (WPM)</span>
              </h4>
              <span className="text-xs text-theme-muted font-mono">
                {features?.speech_rate?.average_wpm || 158} WPM
              </span>
            </div>
            <p className="text-xs text-theme-muted mb-4">
              Pacing comparison against optimal public presentation cadence.
            </p>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={speechRateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 220]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  formatter={(val) => [`${val} WPM`, 'Pacing']}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pitch Trajectory */}
        <div className="bg-theme-surface rounded-2xl p-5 border border-theme-border shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-theme-text flex items-center space-x-1.5">
                <Activity className="w-4 h-4 text-theme-secondary" />
                <span>Fundamental Pitch (F0)</span>
              </h4>
              <span className="text-xs text-theme-muted font-mono">
                Mean: {features?.pitch?.mean_f0 || 185} Hz
              </span>
            </div>
            <p className="text-xs text-theme-muted mb-4">
              Speaker pitch trajectory compared with reference modulation.
            </p>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pitchContourData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[150, 220]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="userF0" stroke="var(--color-secondary)" strokeWidth={2.5} dot={{ r: 3 }} name="Speaker Pitch" />
                <Line type="monotone" dataKey="refF0" stroke="var(--color-muted)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Reference" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vocal Energy */}
        <div className="bg-theme-surface rounded-2xl p-5 border border-theme-border shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-theme-text flex items-center space-x-1.5">
                <Activity className="w-4 h-4 text-theme-success" />
                <span>Vocal Energy Dynamics</span>
              </h4>
              <span className="text-xs text-theme-muted font-mono">
                Avg: {((features?.energy?.average || 0.62) * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-xs text-theme-muted mb-4">
              Normalized RMS loudness across the spoken presentation.
            </p>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyContourData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 1]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  formatter={(val) => [(val * 100).toFixed(0) + '%', 'Intensity']}
                />
                <Area type="monotone" dataKey="energy" stroke="var(--color-success)" fill="rgba(16, 185, 129, 0.2)" strokeWidth={2} name="RMS Energy" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
