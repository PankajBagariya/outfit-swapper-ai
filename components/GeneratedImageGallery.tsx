import React from 'react';
import type { GeneratedImage } from '../types';

interface GeneratedImageGalleryProps {
  images: GeneratedImage[];
}

export const GeneratedImageGallery: React.FC<GeneratedImageGalleryProps> = ({ images }) => {
  const handleUpscale = () => {
    alert("Upscale feature coming soon!");
  };

  return (
    <div className="mt-16">
      <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500" style={{ textShadow: '0 0 15px rgba(217, 70, 239, 0.3)' }}>Your New Looks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-fuchsia-500/30 hover:border-fuchsia-400/50"
            style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`, opacity: 0 }}
          >
            <img src={image.src} alt={`Generated outfit ${index + 1}`} className="w-full h-auto object-cover aspect-[3/4]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="font-bold text-white text-sm drop-shadow-md">{image.prompt}</h3>
                <div className="flex justify-between items-center mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <a
                    href={image.src}
                    download={`outfit_swap_${image.id}.png`}
                    className="px-4 py-2 text-xs bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-semibold rounded-full hover:scale-105 transition-transform shadow-md"
                  >
                    Download
                  </a>
                  <button
                    onClick={handleUpscale}
                    className="px-4 py-2 text-xs bg-black/30 text-white backdrop-blur-sm font-semibold rounded-full hover:bg-white/20 transition-colors"
                  >
                    Upscale
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};