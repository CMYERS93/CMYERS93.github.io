import { useAppStore } from '../store';
import { Droplets, Zap, Gauge, Weight, Scale, CircleDot, Trash2, Clock } from 'lucide-react';

export function History() {
  const { history, clearHistory } = useAppStore();

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xl font-bold text-white">Interaction History</h2>
          <p className="text-zinc-500 text-sm">Last {history.length} completed interactions</p>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* History Grid */}
      {history.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-zinc-600">
          <Clock className="w-12 h-12 mb-3 opacity-50" />
          <p className="text-lg font-medium">No History Yet</p>
          <p className="text-sm">Complete interactions to see them here</p>
        </div>
      ) : (
        <div className="flex-1 overflow-auto pr-2">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="bg-zinc-900/50 rounded-xl border border-zinc-800/50 overflow-hidden hover:border-amber-500/30 transition-colors"
              >
                <div className="flex">
                  {/* Thumbnail */}
                  <div className="w-24 h-24 flex-shrink-0 bg-zinc-800">
                    {entry.imageUrl ? (
                      <img
                        src={entry.imageUrl}
                        alt="Interaction"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600">
                        <span className="text-xs">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Data */}
                  <div className="flex-1 p-2 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-zinc-500 font-mono">
                        {formatTime(entry.timestamp)}
                      </span>
                    </div>

                    {/* Flavour - truncated */}
                    <p className="text-xs text-amber-400/80 italic mb-2 truncate">
                      "{entry.flavour}"
                    </p>

                    {/* Stats Grid - Compact */}
                    <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-xs">
                      <div className="flex items-center gap-1 text-zinc-400">
                        <Droplets className="w-3 h-3 text-blue-400" />
                        <span className="text-zinc-300">{entry.amount.toFixed(2)} ML</span>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-400">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span className="text-zinc-300">{entry.depositRate}x</span>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-400">
                        <Gauge className="w-3 h-3 text-purple-400" />
                        <span className="text-zinc-300 truncate">{entry.pace}</span>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-400">
                        <Weight className="w-3 h-3 text-amber-400" />
                        <span className="text-zinc-300">{entry.weight}g</span>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-400">
                        <Scale className="w-3 h-3 text-emerald-400" />
                        <span className="text-zinc-300">{entry.reach}/{entry.depth}</span>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-400">
                        <CircleDot className="w-3 h-3 text-rose-400" />
                        <span className="text-zinc-300 truncate">{entry.ring}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
