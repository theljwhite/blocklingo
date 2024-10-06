import {
  PUZZLE_BASE,
  PUZZLE_DETAILS_BY_ID,
  PUZZLE_WORDS_BY_ID,
} from "../constants/db";

export type GuessWord = {
  id: number;
  word: string;
  createdAt: Date;
};

export type Puzzle = {
  id: number;
  name: string;
  createdAt: Date;
  difficulty: string; //string for now
  points: number;
  rewardAmount: number;
  expirationAt: Date;
  triggerGroupId: number;
  guessWordId: number;
  guessWord: GuessWord;
};

export const puzzleManager = {
  getAll: async () => {
    const response = await fetch(PUZZLE_BASE);
    return await response.json();
  },
  getById: async (id: number) => {
    const response = await fetch(PUZZLE_DETAILS_BY_ID(id));
    return await response.json();
  },
  getPuzzleWordsById: async (id: number) => {
    const response = await fetch(PUZZLE_WORDS_BY_ID(id));

    if (!response.ok) return null;

    const puzzleWords = await response.json();
    return puzzleWords as Record<string, string[]>;
  },
};
