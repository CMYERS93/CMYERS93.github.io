import { useEffect } from 'react';
import { useAppStore } from '../store';

export default function Main() {
  const { interaction, handleClick, generateInteraction } = useAppStore();

  useEffect(() => {
    if (!interaction) {
      generateInteraction();
    }
  }, [interaction, generateInteraction]);

  if (!interaction) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-zinc-500">Loading...</div>
      </div>
    );
  }

  const clickProgress = ((10 - interaction.clicksRemaining) / 10) * 100;

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto px-4 py-2">
      {/* Top Section - Image and Flavour side by side */}
      <div className="flex gap-4 flex-1 min-h-0">
        {/* Image Display */}
        <div className="relative w-1/2 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900/50">
          {interaction.imageUrl ? (
            <img
              src={interaction.imageUrl}
              alt="Interaction"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm font-medium">
              No images uploaded
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
        </div>

        {/* Right Side - Flavour and Info Panels */}
        <div className="w-1/2 flex flex-col gap-2">
          {/* Flavour Text */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
            <p className="text-amber-400/90 text-sm italic font-medium text-center leading-relaxed">
              "{interaction.flavour}"
            </p>
          </div>

          {/* Info Panels Grid */}
          <div className="grid grid-cols-2 gap-2 flex-1">
            <InfoPanel label="Amount" value={`${interaction.amount.toFixed(2)} ML`} icon="💧" />
            <InfoPanel label="Deposit Rate" value={`${interaction.depositRate}x`} icon="⚡" />
            <InfoPanel label="Pace" value={interaction.pace} icon="🏃" />
            <InfoPanel label="Weight" value={`${interaction.weight}g`} icon="⚖️" />
            <InfoPanel label="Reach / Depth" value={`${interaction.reach} / ${interaction.depth}`} icon="📐" />
            <InfoPanel label="Ring" value={interaction.ring} icon="💍" />
          </div>
        </div>
      </div>

      {/* Bottom Section - Click Area */}
      <div className="mt-3 space-y-2 flex-none">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>Interaction Progress</span>
          <span>{interaction.clicksRemaining} clicks remaining</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-700 to-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${clickProgress}%` }}
          />
        </div>
        
        {/* Click Button */}
        <button
          onClick={handleClick}
          className="w-full py-3 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 active:from-amber-800 active:to-amber-700 text-white font-bold text-base rounded-lg transition-all duration-150 active:scale-[0.98] shadow-lg shadow-amber-900/30 border border-amber-600/30"
        >
          {interaction.clicksRemaining === 10 ? '⚔️ BEGIN' : `⚔️ STRIKE (${interaction.clicksRemaining})`}
        </button>
      </div>
    </div>
  );
}

function InfoPanel({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-md p-2 hover:border-zinc-700 transition-colors">
      <div className="flex items-center gap-1.5 mb-0.5">
        <span className="text-sm">{icon}</span>
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">{label}</span>
      </div>
      <p className="text-zinc-100 font-bold text-xs truncate">{value}</p>
    </div>
  );
}
