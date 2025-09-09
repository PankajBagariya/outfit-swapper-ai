import React from 'react';
import type { HistoryItem } from '../types';

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-16 text-neutral-500" style={{ animation: 'fadeInUp 0.5s ease-out' }}>
        <h3 className="text-2xl font-bold">No History Yet</h3>
        <p>Your generated outfit swaps will appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" style={{ animation: 'fadeInUp 0.5s ease-out' }}>
      {history.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          className="cursor-pointer group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-400/50 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20"
        >
          <div className="relative aspect-video overflow-hidden">
            <img src={item.results[0]?.src || 'https://picsum.photos/300/200'} alt="Generated preview" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white font-bold text-lg drop-shadow-md">View Swap</span>
            </div>
          </div>
          <div className="p-3 flex items-center justify-center gap-3">
            <img src={item.userImage} alt="User" className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow" />
            <span className="text-3xl text-neutral-600 font-light">+</span>
            <img src={item.outfitImage} alt="Outfit" className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow" />
          </div>
        </div>
      ))}
    </div>
  );
};