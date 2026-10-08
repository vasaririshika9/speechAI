import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { getResult } from '../api/client';
import mockResultData from '../mock/result.json';
import Waveform from '../components/Waveform';
import SegmentList from '../components/SegmentList';
import SegmentDetail from '../components/SegmentDetail';
import FeatureCharts from '../components/FeatureCharts';
import {
  Award,
  Zap,
  Volume2,
  Clock,
  Mic,
  Smile,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  Info
} from 'lucide-react';

export default function Results() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const analysisId = searchParams.get('id') || 'demo-001';

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sourceNotice, setSourceNotice] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState(null);

  const audioUrl = location.state?.audioUrl || null;
  const fileName = location.state?.fileName || null;

  useEffect(() => {
    let isMounted = true;

    async function fetchAnalysis() {
      setLoading(true);
      try {
        // Attempt to fetch from backend GET /result/{id}
        const data = await getResult(analysisId);
        if (isMounted) {
          setResult(data);
          setSourceNotice({
            type: 'backend',
            message: `Live data retrieved from FastAPI backend endpoint: GET /result/${analysisId}`,
          });
          if (data.segments && data.segments.length > 0) {
            setSelectedSegment(data.segments[0]); // default select first flaw
          }
        }
      } catch (err) {
        console.warn('Backend result fetch failed, falling back to mock JSON:', err);
        if (isMounted) {
          setResult(mockResultData);
          setSourceNotice({
            type: 'mock',
            message: `Backend unavailable (${err.message}). Displaying local frontend/src/mock/result.json demo data.`,
          });
          if (mockResultData.segments && mockResultData.segments.length > 0) {
            setSelectedSegment(mockResultData.segments[0]);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchAnalysis();

    return () => {
      isMounted = false;
    };
  }, [analysisId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-8 h-8 text-theme-primary animate-spin" />
        <p className="text-theme-muted font-medium">Loading Speech Diagnostic Report...</p>
      </div>
    );
  }

  const categoryScores = result?.category_scores || {
    pacing: 82,
    pitch: 71,
    pause_control: 64,
    energy: 86,
    clarity: 80,
  };

  const categories = [
    { name: 'Pacing', score: categoryScores.pacing, icon: Clock, desc: 'Words per minute cadence' },
    { name: 'Pitch', score: categoryScores.pitch, icon: ActivityIcon, desc: 'F0 contour variance' },
    { name: 'Pause Control', score: categoryScores.pause_control, icon: Volume2, desc: 'Duration & placement' },
    { name: 'Energy', score: categoryScores.energy, icon: Zap, desc: 'Vocal projection dynamic' },
    { name: 'Clarity', score: categoryScores.clarity, icon: Award, desc: 'Phonetic precision' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Bar Navigation & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div className="flex items-center space-x-3">
          <Link
            to="/analyze"
            className="p-2 rounded-xl bg-theme-surface hover:bg-theme-surface-card border border-theme-border text-theme-muted hover:text-theme-text transition-colors"
            title="Upload another recording"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-theme-text">Diagnostic Report</h1>
              <span className="text-xs bg-theme-primary/15 text-theme-primary px-2.5 py-0.5 rounded-full font-mono font-semibold">
                ID: {result?.analysis_id || analysisId}
              </span>
            </div>
            {fileName && (
              <p className="text-xs text-theme-muted mt-0.5">Recording: {fileName}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {sourceNotice && (
            <span
              className={`text-xs px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 ${
                sourceNotice.type === 'backend'
                  ? 'bg-theme-success/10 border-theme-success/30 text-theme-success'
                  : 'bg-theme-warning/10 border-theme-warning/30 text-theme-warning'
              }`}
            >
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>{sourceNotice.message}</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Overall Score Card */}
        <div className="lg:col-span-1 bg-theme-surface rounded-2xl p-6 border border-theme-border shadow-lg flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-theme-muted mb-2">
            Speech Score
          </span>
          <div className="relative my-2 flex items-baseline justify-center">
            <span className="text-6xl font-extrabold text-theme-text tracking-tight">
              {result?.overall_score || 78}
            </span>
            <span className="text-xl font-bold text-theme-muted ml-1">/ 100</span>
          </div>
          <p className="text-xs text-theme-muted max-w-[200px] mt-2">
            Proficient delivery with moderate pacing anomalies and localized monotone sections.
          </p>
          <div className="mt-4 px-3 py-1 rounded-full text-xs font-semibold badge-medium">
            Solid Presentation Base
          </div>
        </div>

        {/* 5 Category Cards */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="bg-theme-surface rounded-2xl p-4 border border-theme-border flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-theme-primary/10 flex items-center justify-center text-theme-primary mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-theme-muted uppercase tracking-wider">
                    {cat.name}
                  </h3>
                  <div className="text-2xl font-black text-theme-text mt-1">{cat.score}</div>
                </div>
                <div className="w-full bg-theme-surface-card h-1.5 rounded-full overflow-hidden mt-4">
                  <div
                    className="h-full bg-theme-primary rounded-full transition-all duration-500"
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transcript Card */}
      {result?.transcript && (
        <div className="bg-theme-surface rounded-2xl p-5 border border-theme-border shadow-md">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-theme-muted mb-2">
            <Mic className="w-4 h-4 text-theme-primary" />
            <span>Spoken Transcript</span>
          </div>
          <p className="text-base text-theme-text leading-relaxed italic">
            "{result.transcript}"
          </p>
        </div>
      )}

      {/* Waveform Component */}
      <Waveform
        audioUrl={audioUrl}
        segments={result?.segments || []}
        onSegmentClick={(segment) => setSelectedSegment(segment)}
      />

      {/* Segment Detail Highlight */}
      {selectedSegment && (
        <SegmentDetail
          segment={selectedSegment}
          onClose={() => setSelectedSegment(null)}
        />
      )}

      {/* Detected Speech Issues List */}
      <SegmentList
        segments={result?.segments || []}
        onSelectSegment={(segment) => setSelectedSegment(segment)}
        selectedSegmentId={selectedSegment?.id}
      />

      {/* Feature Charts */}
      <FeatureCharts features={result?.features} />
    </div>
  );
}

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
