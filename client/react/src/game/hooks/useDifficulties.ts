import { type DifficultySettings, STEP_DIFFICULTIES } from "../store";
import { type Difficulty, useGameStore } from "../store";

export default function useDifficulties() {
  const { step, setMistakes, setDifficulty } = useGameStore((state) => state);

  const handleDifficultyChange = (difficulty: Difficulty): void => {
    setDifficulty(difficulty);
    setMistakes(STEP_DIFFICULTIES[difficulty][step].mistakes);
  };

  const getDifficultySettings = (
    difficulty: Difficulty
  ): DifficultySettings => {
    return STEP_DIFFICULTIES[difficulty][step];
  };

  return { handleDifficultyChange, getDifficultySettings };
}
