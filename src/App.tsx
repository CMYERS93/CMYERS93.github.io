import { useState, useRef } from 'react';
import Main from './components/Main';
import Manager from './components/Manager';
import { History } from './components/History';
import html2canvas from 'html2canvas';

type Tab = 'main' | 'manager' | 'history';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('main');
  const captureRef = useRef<HTMLDivElement>(null);

  const handleScreenshot = async () => {
    if (!captureRef.current) return;
    
    try {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `screenshot-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Screenshot failed:', err);
    }
  };

  return (
    <div className="h-screen bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-none border-b border-zinc-800 bg-zinc-950 z-50">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">⚔</span>
            </div>
            <h1 className="text-base font-bold tracking-tight text-zinc-100">
              INTERACTION<span className="text-amber-500">FORGE</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Screenshot Button */}
            <button
              onClick={handleScreenshot}
              className="p-1.5 text-zinc-500 hover:text-amber-500 hover:bg-zinc-800 rounded-lg transition-all"
              title="Take screenshot"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            {/* Tabs */}
            <div className="flex bg-zinc-900 rounded-lg p-0.5 border border-zinc-800">
              <button
                onClick={() => setActiveTab('main')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'main'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Main
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'history'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                History
              </button>
              <button
                onClick={() => setActiveTab('manager')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'manager'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Manager
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main ref={captureRef} className="flex-1 overflow-hidden">
        {activeTab === 'main' && <Main />}
        {activeTab === 'history' && <History />}
        {activeTab === 'manager' && <Manager />}
      </main>

      {/* Footer */}
      <footer className="flex-none border-t border-zinc-800/50 py-1.5">
        <div className="max-w-5xl mx-auto px-4 text-center text-xs text-zinc-600">
          INTERACTION FORGE — Built for warriors
        </div>
      </footer>
    </div>
  );
}
