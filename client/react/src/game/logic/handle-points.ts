import {
  CONNECTION_MISTAKES_POINTS_PENALTY,
  CONTEXT_FAILED_GUESSES_POINTS_PENALTY,
} from "../data/constants";

export const calculatePointsEarned = (
  puzzlePointsTotal: number,
  contextFailedGuessesCount: number,
  connectionsMistakesCount: number
): number => {
  const connectionPenalty =
    connectionsMistakesCount * CONNECTION_MISTAKES_POINTS_PENALTY;
  const contextPenalty =
    contextFailedGuessesCount * CONTEXT_FAILED_GUESSES_POINTS_PENALTY;

  const totalPentalty = connectionPenalty + contextPenalty;

  const pointsEarned = Math.max(puzzlePointsTotal - totalPentalty, 0);

  return pointsEarned;
};
