
import { GoogleGenAI, Modality } from "@google/genai";
import { OUTFIT_SWAP_PROMPTS } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      }
    };
    reader.readAsDataURL(file);
  });
  const base64Data = await base64EncodedDataPromise;
  return {
    inlineData: {
      data: base64Data,
      mimeType: file.type,
    },
  };
};

const generateSingleImage = async (userImagePart: any, outfitImagePart: any, prompt: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents: {
      parts: [
        userImagePart,
        outfitImagePart,
        {
          text: `Take the person from the first image and replace their clothes with the outfit from the second image. Use the following style: ${prompt}`
        }
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64ImageBytes = part.inlineData.data;
      const mimeType = part.inlineData.mimeType;
      return `data:${mimeType};base64,${base64ImageBytes}`;
    }
  }
  throw new Error("No image was generated for the prompt.");
};


export const performOutfitSwap = async (userImage: File, outfitImage: File): Promise<string[]> => {
  const userImagePart = await fileToGenerativePart(userImage);
  const outfitImagePart = await fileToGenerativePart(outfitImage);
  
  const imagePromises = OUTFIT_SWAP_PROMPTS.map(p => 
    generateSingleImage(userImagePart, outfitImagePart, p.prompt)
  );
  
  const results = await Promise.all(imagePromises);
  return results;
};
