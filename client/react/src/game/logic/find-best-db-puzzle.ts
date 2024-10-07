import { api } from "../../managers/api";
import { type Puzzle } from "../../managers/puzzle-manager";

//TODO fallback logic for when all db puzzles are solved

export const getNextPuzzleForUser = async (
  userId: number
): Promise<Puzzle | null> => {
  const { unattempted, unsolved } =
    await api.puzzle.getBestAvailablePuzzlesByUserId(userId);

  if (unattempted.length > 0) return chooseRandomPuzzle(unattempted);
  if (unsolved.length > 0) return chooseRandomPuzzle(unattempted);

  return null;
};

export const chooseRandomPuzzle = (puzzles: Puzzle[]): Puzzle => {
  return puzzles[Math.floor(Math.random() * puzzles.length)];
};
