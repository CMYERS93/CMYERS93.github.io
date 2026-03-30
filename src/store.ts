import { create } from 'zustand';
import type { FlavourEntry, Interaction, HistoryEntry } from './types';
import { DEFAULT_FLAVOURS, PACES, RINGS } from './types';

interface AppState {
  images: string[];
  setImages: (images: string[]) => void;
  addImage: (image: string) => void;
  
  flavours: FlavourEntry[];
  addFlavour: (text: string) => void;
  deleteFlavour: (id: string) => void;
  
  interaction: Interaction | null;
  generateInteraction: () => void;
  handleClick: () => void;
  
  history: HistoryEntry[];
  addToHistory: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
}

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const useAppStore = create<AppState>((set, get) => ({
  images: [],
  setImages: (images: string[]) => set({ images }),
  addImage: (image: string) => set((state) => ({ images: [...state.images, image] })),
  
  flavours: DEFAULT_FLAVOURS,
  addFlavour: (text: string) => set((state) => ({
    flavours: [...state.flavours, { id: Date.now().toString(), text }]
  })),
  deleteFlavour: (id: string) => set((state) => ({
    flavours: state.flavours.filter((f: FlavourEntry) => f.id !== id)
  })),
  
  interaction: null,
  generateInteraction: () => {
    const state = get();
    const imageUrl = state.images.length > 0 
      ? getRandomItem(state.images)
      : '';
    
    set({
      interaction: {
        imageUrl,
        flavour: getRandomItem(state.flavours).text,
        amount: parseFloat(getRandom(2.83, 22.99).toFixed(2)),
        depositRate: getRandomInt(1, 8),
        pace: getRandomItem(PACES),
        weight: getRandomInt(280, 2800),
        reach: getRandomInt(15, 30),
        depth: getRandomInt(6, 12),
        ring: getRandomItem(RINGS),
        clicksRemaining: 10,
      }
    });
  },
  handleClick: () => {
    const state = get();
    if (!state.interaction) return;
    
    const newClicks = state.interaction.clicksRemaining - 1;
    
    if (newClicks <= 0) {
      // Save to history before generating new interaction
      const interaction = state.interaction;
      get().addToHistory({
        imageUrl: interaction.imageUrl,
        flavour: interaction.flavour,
        amount: interaction.amount,
        depositRate: interaction.depositRate,
        pace: interaction.pace,
        weight: interaction.weight,
        reach: interaction.reach,
        depth: interaction.depth,
        ring: interaction.ring,
      });
      get().generateInteraction();
    } else {
      set({
        interaction: { ...state.interaction, clicksRemaining: newClicks }
      });
    }
  },
  
  history: [],
  addToHistory: (entry) => set((state) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    // Keep only last 50 entries
    const newHistory = [newEntry, ...state.history].slice(0, 50);
    return { history: newHistory };
  }),
  clearHistory: () => set({ history: [] }),
}));
