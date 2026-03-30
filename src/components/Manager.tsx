import { useState, useRef } from 'react';
import { useAppStore } from '../store';
import type { FlavourEntry } from '../types';

const MAX_SIZE = 600;

function downscaleImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_SIZE) {
            height = (height * MAX_SIZE) / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = (width * MAX_SIZE) / height;
            height = MAX_SIZE;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function Manager() {
  const { images, setImages, flavours, addFlavour, deleteFlavour } = useAppStore();
  const [newFlavour, setNewFlavour] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const processedImages: string[] = [...images];
    
    for (const file of Array.from(files)) {
      if (file.type.startsWith('image/')) {
        const downscaled = await downscaleImage(file);
        processedImages.push(downscaled);
      }
    }
    
    setImages(processedImages);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddFlavour = () => {
    if (newFlavour.trim()) {
      addFlavour(newFlavour.trim());
      setNewFlavour('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto px-4 py-2 gap-3 overflow-hidden">
      {/* Image Upload Section */}
      <div className="flex-1 bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col min-h-0">
        <h2 className="text-lg font-bold text-zinc-100 mb-2 flex items-center gap-2">
          <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Image Library <span className="text-xs font-normal text-zinc-500">({images.length})</span>
        </h2>
        
        <div className="flex gap-3 mb-2">
          <label
            htmlFor="image-upload"
            className="flex items-center justify-center px-4 h-10 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-amber-600 hover:bg-zinc-800/50 transition-all duration-200 flex-shrink-0"
          >
            <svg className="w-5 h-5 text-zinc-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm text-zinc-400">Add Images</span>
            <input
              id="image-upload"
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
            />
          </label>
        </div>
        
        {images.length > 0 && (
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {images.map((img, index) => (
                <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-zinc-800">
                  <img src={img} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0.5 right-0.5 bg-red-600/80 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Flavour Management Section */}
      <div className="flex-1 bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col min-h-0">
        <h2 className="text-lg font-bold text-zinc-100 mb-2 flex items-center gap-2">
          <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          Flavour Entries <span className="text-xs font-normal text-zinc-500">({flavours.length})</span>
        </h2>
        
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newFlavour}
            onChange={(e) => setNewFlavour(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddFlavour()}
            placeholder="Enter new flavour text..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-600 transition-colors"
          />
          <button
            onClick={handleAddFlavour}
            disabled={!newFlavour.trim()}
            className="bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
          <div className="space-y-1">
            {flavours.map((flavour: FlavourEntry) => (
              <div
                key={flavour.id}
                className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2 group hover:border-zinc-600 transition-colors"
              >
                <p className="text-zinc-300 text-xs flex-1 mr-2 truncate">{flavour.text}</p>
                <button
                  onClick={() => deleteFlavour(flavour.id)}
                  className="text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-0.5 flex-shrink-0"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
