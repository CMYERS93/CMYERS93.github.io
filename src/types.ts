export interface FlavourEntry {
  id: string;
  text: string;
}

export interface Interaction {
  imageUrl: string;
  flavour: string;
  amount: number;
  depositRate: number;
  pace: string;
  weight: number;
  reach: number;
  depth: number;
  ring: string;
  clicksRemaining: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  imageUrl: string;
  flavour: string;
  amount: number;
  depositRate: number;
  pace: string;
  weight: number;
  reach: number;
  depth: number;
  ring: string;
}

export const PACES = [
  'Mellow',
  'Very Slow',
  'Slow',
  'Average-Slow',
  'Average',
  'Average-Fast',
  'Fast',
  'Very Fast',
  'Extreme',
];

export const RINGS = [
  'Sandpaper Ring',
  'Thick Black Ring',
  'Thick Navy Ring',
  'Thin Silver Ring',
  'Stone Ring',
  'Corded Ring',
  'Barbed Wire Ring',
  'Leather Ring',
  'Pink Silk Ring',
  'Blue Silk Ring',
  'Shoelace Ring',
];

export const DEFAULT_FLAVOURS: FlavourEntry[] = [
  { id: '1', text: 'Forged in the fires of ancient battle.' },
  { id: '2', text: 'Steel meets steel in the darkness.' },
  { id: '3', text: 'Thunder rolls across the iron plains.' },
  { id: '4', text: 'A lone wolf howls at the crimson moon.' },
  { id: '5', text: 'The blacksmith\'s hammer strikes true.' },
];
