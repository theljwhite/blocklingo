import { post } from "./api";
import {
  PUZZLE_ATTEMPT_BASE,
  PUZZLE_ATTEMPT_BY_USER_AND_PUZZLE,
  PUZZLE_ATTEMPT_SOLVE,
  PUZZLE_ATTEMPT_INCREMENT_TRIES,
} from "../constants/db";

export type PuzzleAttempt = {
  id: number;
  completionTimeSeconds: number | null;
  tries: number | null;
  guesses: number | null;
  mistakes: number | null;
  isSolved: boolean;
  earnedPoints: number | null;
  userId: number;
  puzzleId: number;
  createdAt: Date;
  updatedAt: Date | null;
};

export const puzzleAttemptManager = {
  getByPuzzleIdAndUserId: async (puzzleId: number, userId: number) => {
    const response = await fetch(
      PUZZLE_ATTEMPT_BY_USER_AND_PUZZLE(puzzleId, userId)
    );
    if (!response.ok) return null;

    return (await response.json()) as PuzzleAttempt;
  },
  add: async (puzzleAttempt: Partial<PuzzleAttempt>) => {
    const initPuzzleAttempt = {
      completionTimeSeconds: 0,
      guesses: 0,
      isSolved: false,
      earnedPoints: 0,
      mistakes: 0, //TODO - can update this to run on every mistake and not game end if want
      tries: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const response = await post<PuzzleAttempt>(PUZZLE_ATTEMPT_BASE, {
      ...initPuzzleAttempt,
      ...puzzleAttempt,
    });
    return response;
  },
  solve: async (puzzleAttempt: Partial<PuzzleAttempt>) => {
    //unchanged values still passed to request to satisfy Swagger for now
    const unchangedValues = {
      tries: 0,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    const response = await fetch(PUZZLE_ATTEMPT_SOLVE(puzzleAttempt.id ?? 0), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...unchangedValues, ...puzzleAttempt }),
    });
    return response;
  },
  incrementTries: async (puzzleAttemptId: number) => {
    const response = await fetch(
      PUZZLE_ATTEMPT_INCREMENT_TRIES(puzzleAttemptId),
      {
        method: "PATCH",
      }
    );
    return response;
  },
};
