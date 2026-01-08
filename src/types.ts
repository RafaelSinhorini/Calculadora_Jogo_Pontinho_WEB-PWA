
export interface Player {
  id: number;
  name: string;
  totalPoints: number;
  lastExploded: boolean;
  explosionCount: number;
}

export interface Round {
  id: number;
  scores: number[]; // Scores per player index
}

export type View = 'setup' | 'game';
