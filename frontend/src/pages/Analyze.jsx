import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadRecorder from '../components/UploadRecorder';
import ProgressStatus from '../components/ProgressStatus';
import { analyzeSpeech } from '../api/client';
import mockResult from '../mock/result.json';
import { Sparkles, AlertCircle, Info } from 'lucide-react';

export default function Analyze() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'processing', 'completed', null
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [fallbackNotice, setFallbackNotice] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError(null);
    setFallbackNotice(null);
    setStatus(null);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setError(null);
    setFallbackNotice(null);
    setStatus(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsSubmitting(true);
    setStatus('processing');
    setMessage('Uploading audio to FastAPI backend...');
    setError(null);
    setFallbackNotice(null);

    try {
      // Call actual backend endpoint POST /analyze
      const response = await analyzeSpeech(selectedFile);
      setStatus('completed');
      setMessage(response.message || 'Speech analysis started');

      // Navigate to /results?id=demo-001 with audio URL in history state if blob URL created
      setTimeout(() => {
        const audioUrl = URL.createObjectURL(selectedFile);
        navigate(`/results?id=${response.analysis_id || 'demo-001'}`, {
          state: {
            audioUrl,
            fileName: selectedFile.name,
            backendVerified: true,
          },
        });
      }, 800);
    } catch (err) {
      console.warn('Backend call failed, using graceful fallback:', err);
      // Backend is unavailable - gracefully fall back to mock data with a clear message
      // DO NOT fake a successful backend request: explicitly notify the user!
      setFallbackNotice(
        `Backend server (http://localhost:8000) was unreachable (${err.message}). Gracefully redirecting to offline Mock Diagnostics mode.`
      );
      setStatus('completed');

      setTimeout(() => {
        const audioUrl = URL.createObjectURL(selectedFile);
        navigate('/results?id=demo-001', {
          state: {
            audioUrl,
            fileName: selectedFile.name,
            backendVerified: false,
            fallbackNotice: 'Loaded from local mock/result.json (Backend was offline during upload)',
          },
        });
      }, 1800);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-theme-surface-card border border-theme-border text-xs text-theme-primary font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Day 1 Diagnostic Pipeline Prototype</span>
        </div>
        <h1 className="text-3xl font-bold text-theme-text">Speech Analysis Studio</h1>
        <p className="text-sm text-theme-muted mt-2 max-w-lg mx-auto">
          Upload any spoken presentation, lecture snippet, or interview answer to diagnose delivery pacing, pauses, and pitch dynamics.
        </p>
      </div>

      <UploadRecorder
        selectedFile={selectedFile}
        onFileSelect={handleFileSelect}
        onFileRemove={handleFileRemove}
        onAnalyze={handleAnalyze}
        isSubmitting={isSubmitting}
      />

      <ProgressStatus
        status={status}
        message={message}
        error={error}
        fallbackNotice={fallbackNotice}
      />

      <div className="mt-8 bg-theme-surface rounded-xl p-4 border border-theme-border text-xs text-theme-muted flex items-start space-x-3">
        <Info className="w-4 h-4 text-theme-primary shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-theme-text mb-0.5">Day 1 Mock Contract Verification</p>
          <p>
            When you click Analyze, the frontend issues a <code className="text-theme-primary">POST /analyze</code> request with the audio file. The backend acknowledges with an <code className="text-theme-primary">analysis_id</code>, after which the client retrieves <code className="text-theme-primary">GET /result/&#123;id&#125;</code> for diagnostic visualization.
          </p>
        </div>
      </div>
    </div>
  );
}
