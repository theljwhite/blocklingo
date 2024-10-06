import { PUZZLE_BASE, PUZZLE_BY_ID } from "../constants/db";

export type Puzzle = {
  id: number;
  name: string;
  createdAt: Date;
  difficulty: string; //string for now
  points: number;
  rewardAmount: number;
  expirationAt: Date;
  triggerWords: string[]; //temporary
  puzzleWords: string[]; //temporary
  guessWord: string;
};

export const puzzleManager = {
  getAll: async () => {
    const response = await fetch(PUZZLE_BASE);
    return await response.json();
  },
  getById: async (id: number) => {
    const response = await fetch(PUZZLE_BY_ID(id));
    return await response.json();
  },
};
