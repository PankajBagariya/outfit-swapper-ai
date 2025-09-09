import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Analyzing textures and lighting...",
  "Aligning the outfit to your pose...",
  "Blending fabrics for a realistic look...",
  "Applying final shadows and highlights...",
  "Almost there, preparing your new styles...",
];

export const Loader: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-16 flex flex-col items-center justify-center space-y-6">
       <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-cyan-400 rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-fuchsia-500 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
      </div>
      <p className="text-neutral-300 text-lg transition-opacity duration-500">{loadingMessages[messageIndex]}</p>
    </div>
  );
};