import React from 'react';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ProgressStatus({ status, message, error, fallbackNotice }) {
  if (!status && !error && !fallbackNotice) return null;

  return (
    <div className="mt-6 space-y-3">
      {status === 'processing' && (
        <div className="bg-theme-surface-card border border-theme-primary/30 rounded-xl p-4 flex items-center space-x-3 text-theme-text animate-pulse">
          <Loader2 className="w-5 h-5 text-theme-primary animate-spin shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">{message || "Processing speech diagnostics..."}</p>
            <p className="text-xs text-theme-muted">Uploading audio and generating temporal grounding...</p>
          </div>
        </div>
      )}

      {status === 'completed' && (
        <div className="bg-theme-surface-card border border-theme-success/30 rounded-xl p-4 flex items-center space-x-3 text-theme-text">
          <CheckCircle2 className="w-5 h-5 text-theme-success shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">Analysis ready</p>
            <p className="text-xs text-theme-muted">Redirecting to diagnostic report...</p>
          </div>
        </div>
      )}

      {fallbackNotice && (
        <div className="bg-theme-warning/10 border border-theme-warning/30 rounded-xl p-4 flex items-start space-x-3 text-theme-text">
          <AlertCircle className="w-5 h-5 text-theme-warning shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-theme-warning">Backend Notice</p>
            <p className="text-xs text-theme-muted mt-0.5">{fallbackNotice}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-theme-danger/10 border border-theme-danger/30 rounded-xl p-4 flex items-start space-x-3 text-theme-text">
          <AlertCircle className="w-5 h-5 text-theme-danger shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-theme-danger">Request Failed</p>
            <p className="text-xs text-theme-muted mt-0.5">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
