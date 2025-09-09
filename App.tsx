import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { GeneratedImageGallery } from './components/GeneratedImageGallery';
import { HistoryPanel } from './components/HistoryPanel';
import { Loader } from './components/Loader';
import { OpeningAnimation } from './components/OpeningAnimation';
import { performOutfitSwap } from './services/geminiService';
import { OUTFIT_SWAP_PROMPTS } from './constants';
import type { GeneratedImage, HistoryItem, AppTab } from './types';

const App: React.FC = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [userImage, setUserImage] = useState<File | null>(null);
  const [outfitImage, setOutfitImage] = useState<File | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<AppTab>('generator');

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleSwap = useCallback(async () => {
    if (!userImage || !outfitImage) {
      setError("Please upload both your photo and the outfit's photo.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const results = await performOutfitSwap(userImage, outfitImage);
      const newGeneratedImages = results.map((src, index) => ({
        id: `${Date.now()}-${index}`,
        src,
        prompt: OUTFIT_SWAP_PROMPTS[index].title,
      }));
      setGeneratedImages(newGeneratedImages);

      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        userImage: URL.createObjectURL(userImage),
        outfitImage: URL.createObjectURL(outfitImage),
        results: newGeneratedImages,
      };
      setHistory(prev => [newHistoryItem, ...prev]);

    } catch (err) {
      console.error(err);
      setError("Failed to generate images. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [userImage, outfitImage]);

  const handleHistorySelect = (item: HistoryItem) => {
    setGeneratedImages(item.results);
    setActiveTab('generator');
    setUserImage(null); // Reset uploader for clarity
    setOutfitImage(null);
  };
  
  const clearUploads = () => {
      setUserImage(null);
      setOutfitImage(null);
      setGeneratedImages([]);
      setError(null);
  }

  if (showAnimation) {
    return <OpeningAnimation />;
  }

  return (
    <div className="min-h-screen bg-[#05020d] text-neutral-200 selection:bg-cyan-500 selection:text-black">
      <div className="wavy-gradient-bg">
        <div className="color-orb orb-1"></div>
        <div className="color-orb orb-2"></div>
        <div className="color-orb orb-3"></div>
      </div>
      
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-10 flex justify-center items-center gap-2 p-1.5 rounded-full bg-black/20 backdrop-blur-lg border border-white/10 w-fit mx-auto">
          <button
            onClick={() => setActiveTab('generator')}
            className={`relative px-6 py-2 text-md font-medium transition-colors duration-300 rounded-full ${activeTab === 'generator' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            Generator
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`relative px-6 py-2 text-md font-medium transition-colors duration-300 rounded-full ${activeTab === 'history' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            History
          </button>
        </div>

        {activeTab === 'generator' && (
          <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
            <ImageUploader
              onUserImageUpload={setUserImage}
              onOutfitImageUpload={setOutfitImage}
              userImage={userImage}
              outfitImage={outfitImage}
            />
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={handleSwap}
                disabled={!userImage || !outfitImage || isLoading}
                className="button-aurora-glow px-8 py-4 text-lg bg-black/30 border border-white/10 backdrop-blur-md text-white font-bold rounded-full shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:scale-105 transition-all duration-300 disabled:bg-neutral-700 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed"
              >
                 <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-fuchsia-400">
                  {isLoading ? 'Generating...' : 'Swap My Outfit!'}
                </span>
              </button>
               {(userImage || outfitImage) && !isLoading && (
                <button
                  onClick={clearUploads}
                  className="px-8 py-4 text-lg bg-black/20 backdrop-blur-sm border border-white/10 text-neutral-300 font-bold rounded-full shadow-md hover:bg-white/10 transition-all duration-300"
                >
                  Clear
                </button>
              )}
            </div>

            {error && <p className="mt-4 text-center text-red-400 font-medium">{error}</p>}

            {isLoading && <Loader />}
            
            {!isLoading && generatedImages.length > 0 && (
              <GeneratedImageGallery images={generatedImages} />
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <HistoryPanel history={history} onSelect={handleHistorySelect} />
        )}

      </main>
      <footer className="text-center py-6 text-neutral-600">
        <p>Developed by Pankaj Bagariya</p>
      </footer>
    </div>
  );
};

export default App;