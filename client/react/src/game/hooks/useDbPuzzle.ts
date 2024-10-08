import { api } from "../../managers/api";
import { useGameStore } from "../store";
import { useSession } from "../../managers/auth/useSession";
import useDifficulties from "./useDifficulties";
import { type Puzzle } from "../../managers/puzzle-manager";
import { type PuzzleAttempt } from "../../managers/puzzle-attempt-manager";
import { calculatePointsEarned } from "../logic/handle-points";

//TODO fallback logic for when all db puzzles are solved
// - clean this up so that it's less db trips

type GetDbPuzzleReturn = {
  puzzle: Puzzle;
  words: Record<string, string[]>;
};

export default function useDbPuzzle() {
  const {
    puzzleDetails,
    puzzleAttempt,
    contextGuesses,
    mistakes,
    isAdminMode,
    setPuzzleDetails,
    setPuzzleAttempt,
  } = useGameStore((state) => state);
  const { getDifficultySettings } = useDifficulties();
  const { session } = useSession();

  const getNextPuzzleForUser = async (
    userId: number
  ): Promise<Puzzle | null> => {
    const { unattempted, unsolved } =
      await api.puzzle.getBestAvailablePuzzlesByUserId(userId);

    if (unattempted.length > 0) return chooseRandomPuzzle(unattempted);
    if (unsolved.length > 0) return chooseRandomPuzzle(unsolved);

    return null;
  };

  const getAndSetDbPuzzle = async (): Promise<GetDbPuzzleReturn | null> => {
    const puzzle = await getNextPuzzleForUser(session?.user?.id ?? 0);

    if (!puzzle) return null;

    const puzzleWords = await api.puzzle.getPuzzleWordsById(puzzle.id);

    if (!puzzleWords) return null;

    setPuzzleDetails(puzzle);

    const existingPuzzleAttempt =
      await api.puzzleAttempt.getByPuzzleIdAndUserId(
        puzzle.id,
        session?.user?.id ?? 0
      );

    if (existingPuzzleAttempt) setPuzzleAttempt(existingPuzzleAttempt);

    return { puzzle, words: puzzleWords };
  };

  const createOrUpdateFailedPuzzleAttempt = async (): Promise<void> => {
    if (isAdminMode) return;
    try {
      if (!puzzleAttempt) {
        const newPuzzleAttempt = {
          userId: session?.user?.id ?? 0,
          puzzleId: puzzleDetails?.id ?? 0,
        };

        await api.puzzleAttempt.add(newPuzzleAttempt);
      } else {
        await api.puzzleAttempt.incrementTries(puzzleAttempt.id);
      }
    } catch (error) {
      console.error("TODO: error handle", error);
    }
  };

  const updateSolvedPuzzleAttempt = async (): Promise<void> => {
    if (!puzzleAttempt || isAdminMode) return;
    try {
      const { points: totalPointsPossible, difficulty } = puzzleDetails ?? {};

      const contextFailedGuessesCount = contextGuesses.length - 1;

      const difficultySettings = getDifficultySettings(difficulty ?? "Medium");

      const connectionsMistakesCount = difficultySettings.mistakes - mistakes;

      const earnedPoints = calculatePointsEarned(
        totalPointsPossible ?? 0,
        contextFailedGuessesCount,
        connectionsMistakesCount
      );

      const updatedAttempt: Partial<PuzzleAttempt> = {
        id: puzzleAttempt.id,
        completionTimeSeconds: null, //TODO if I can get to this
        guesses: contextGuesses.length,
        mistakes: connectionsMistakesCount,
        isSolved: true,
        userId: session?.user?.id ?? 0,
        puzzleId: puzzleDetails?.id ?? 0,
        updatedAt: new Date().toISOString(),
        earnedPoints,
      };

      await api.puzzleAttempt.solve(updatedAttempt);
    } catch (error) {
      console.error("TODO: error handle", error);
    }
  };

  const chooseRandomPuzzle = (puzzles: Puzzle[]): Puzzle => {
    return puzzles[Math.floor(Math.random() * puzzles.length)];
  };

  return {
    getAndSetDbPuzzle,
    createOrUpdateFailedPuzzleAttempt,
    updateSolvedPuzzleAttempt,
  };
}
