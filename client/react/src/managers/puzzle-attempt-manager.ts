import { post } from "./api";

export type PuzzleAttempt = {
  id: number;
  completionTimeSeconds: number;
  tries: number;
  isSolved: boolean;
  earnedPoints: number;
  userId: number;
  puzzleId: number;
  createdAt: Date;
};

export const puzzleAttemptManager = {
  add: async (): Promise<any> => {
    //TODO
  },
};
