import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Analyze from './pages/Analyze';
import Results from './pages/Results';
import About from './pages/About';
import { healthCheck } from './api/client';
import { Activity, Mic, Info, CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const location = useLocation();
  const [backendOnline, setBackendOnline] = useState(null);

  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await healthCheck();
        if (res && res.status === 'ok') {
          setBackendOnline(true);
        } else {
          setBackendOnline(false);
        }
      } catch (err) {
        setBackendOnline(false);
      }
    }
    checkHealth();
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/analyze', label: 'Analyze' },
    { to: '/results', label: 'Results' },
    { to: '/about', label: 'About' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-theme-background text-theme-text font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-theme-surface/80 backdrop-blur-md border-b border-theme-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2.5 font-bold text-lg text-theme-text group">
            <div className="p-2 rounded-xl bg-theme-primary/10 text-theme-primary group-hover:bg-theme-primary group-hover:text-white transition-all">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight">Speech Diagnosis</span>
              <span className="text-[10px] text-theme-muted font-normal">Contrastive Analytics</span>
            </div>
          </Link>

          {/* Navigation items */}
          <nav className="flex items-center space-x-1 sm:space-x-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-theme-primary/15 text-theme-primary'
                      : 'text-theme-muted hover:text-theme-text hover:bg-theme-surface-card'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Backend Status indicator */}
          <div className="hidden sm:flex items-center space-x-2 text-xs">
            <span className="text-theme-muted">Backend:</span>
            {backendOnline === true ? (
              <span className="flex items-center space-x-1 text-theme-success font-medium bg-theme-success/10 px-2.5 py-1 rounded-full border border-theme-success/20">
                <span className="w-2 h-2 rounded-full bg-theme-success animate-pulse" />
                <span>Connected</span>
              </span>
            ) : backendOnline === false ? (
              <span className="flex items-center space-x-1 text-theme-warning font-medium bg-theme-warning/10 px-2.5 py-1 rounded-full border border-theme-warning/20">
                <span className="w-2 h-2 rounded-full bg-theme-warning" />
                <span>Offline (Mock mode)</span>
              </span>
            ) : (
              <span className="text-theme-muted">Connecting...</span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/results" element={<Results />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-theme-border bg-theme-surface/40 py-6 text-center text-xs text-theme-muted">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Speech Diagnosis • Temporal Flaw Grounding System (Day 1 Prototype)
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-theme-muted/70">FastAPI • React • Vite • Tailwind</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
