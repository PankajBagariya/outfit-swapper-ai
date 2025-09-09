import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center p-8">
    <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500" style={{ textShadow: '0 0 20px rgba(217, 70, 239, 0.4), 0 0 30px rgba(0, 255, 255, 0.4)' }}>
      Outfit Swapper AI
    </h1>
    <p className="mt-2 text-lg text-neutral-400">
      Experience the future of fashion. Instantly.
    </p>
  </header>
);