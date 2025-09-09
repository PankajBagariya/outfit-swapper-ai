import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
  onUserImageUpload: (file: File) => void;
  onOutfitImageUpload: (file: File) => void;
  userImage: File | null;
  outfitImage: File | null;
}

const UploadBox: React.FC<{
  onImageUpload: (file: File) => void;
  image: File | null;
  title: string;
  id: string;
}> = ({ onImageUpload, image, title, id }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };
  
  const previewUrl = image ? URL.createObjectURL(image) : null;

  return (
    <div className="w-full md:w-1/2 p-2">
      <h3 className="text-center text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500">{title}</h3>
      <label
        htmlFor={id}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center w-full h-80 border border-dashed rounded-3xl cursor-pointer transition-all duration-300 group
                   ${isDragging 
                     ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_35px_rgba(0,255,255,0.4)]' 
                     : 'border-white/20 bg-black/30 hover:border-white/40'}`}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="object-cover h-full w-full rounded-3xl" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <svg className="w-10 h-10 mb-4 text-neutral-500 group-hover:text-cyan-400 transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-neutral-400"><span className="font-semibold text-neutral-300">Click to upload</span> or drag & drop</p>
            <p className="text-xs text-neutral-500">PNG, JPG, or WEBP</p>
          </div>
        )}
        <input id={id} type="file" className="hidden" accept="image/*" onChange={handleChange} />
      </label>
    </div>
  );
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUserImageUpload, onOutfitImageUpload, userImage, outfitImage }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-4 p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40">
      <UploadBox onImageUpload={onUserImageUpload} image={userImage} title="Your Photo" id="user-photo" />
      <UploadBox onImageUpload={onOutfitImageUpload} image={outfitImage} title="The Outfit" id="outfit-photo" />
    </div>
  );
};