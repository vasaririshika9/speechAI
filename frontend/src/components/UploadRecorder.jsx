import React, { useRef } from 'react';
import { UploadCloud, FileAudio, X, Play, ArrowRight } from 'lucide-react';

export default function UploadRecorder({ selectedFile, onFileSelect, onFileRemove, onAnalyze, isSubmitting }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-theme-surface rounded-2xl p-6 sm:p-8 border border-theme-border shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-theme-text">Upload Your Speech Audio</h2>
        <p className="text-sm text-theme-muted mt-1">
          Supports WAV, MP3, M4A, OGG, or WEBM audio recordings.
        </p>
      </div>

      {!selectedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-theme-border hover:border-theme-primary rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 bg-theme-surface-card hover:bg-theme-surface-card/70 group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
            id="audio-file-input"
          />
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-theme-primary/10 flex items-center justify-center text-theme-primary group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>
          <p className="font-semibold text-theme-text text-base">
            Click to upload or drag & drop audio here
          </p>
          <p className="text-xs text-theme-muted mt-2">
            Recommended duration: 30 seconds to 3 minutes
          </p>
        </div>
      ) : (
        <div className="bg-theme-surface-card rounded-xl p-5 border border-theme-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 truncate">
              <div className="p-3 bg-theme-primary/10 rounded-lg text-theme-primary shrink-0">
                <FileAudio className="w-6 h-6" />
              </div>
              <div className="truncate">
                <p className="text-sm font-semibold text-theme-text truncate">{selectedFile.name}</p>
                <p className="text-xs text-theme-muted">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for analysis
                </p>
              </div>
            </div>

            <button
              onClick={onFileRemove}
              disabled={isSubmitting}
              className="p-2 text-theme-muted hover:text-theme-danger hover:bg-theme-danger/10 rounded-lg transition-colors"
              title="Remove audio file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onAnalyze}
              disabled={isSubmitting}
              id="analyze-submit-button"
              className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-theme-primary hover:bg-theme-primary-hover shadow-lg shadow-theme-primary/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? 'Submitting to Analyzer...' : 'Analyze Speech'}</span>
              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
              className="py-3 px-5 rounded-xl font-medium text-sm text-theme-muted hover:text-theme-text bg-theme-surface hover:bg-theme-surface/80 border border-theme-border transition-colors"
            >
              Choose different file
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* Quick Demo Sample Option */}
      {!selectedFile && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              // Create a dummy mock File object
              const demoBlob = new Blob(["mock-speech-sample-audio-bytes"], { type: "audio/wav" });
              const demoFile = new File([demoBlob], "sample_pitch_presentation.wav", { type: "audio/wav" });
              onFileSelect(demoFile);
            }}
            className="text-xs text-theme-primary hover:underline font-medium inline-flex items-center space-x-1"
          >
            <span>Or load demo sample: sample_pitch_presentation.wav</span>
          </button>
        </div>
      )}
    </div>
  );
}
