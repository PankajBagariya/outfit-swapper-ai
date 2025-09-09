
export interface GeneratedImage {
  id: string;
  src: string;
  prompt: string;
}

export interface HistoryItem {
  id: string;
  userImage: string; // URL or base64 string for display
  outfitImage: string; // URL or base64 string for display
  results: GeneratedImage[];
}

export type AppTab = 'generator' | 'history';
