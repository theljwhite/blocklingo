import { create } from "zustand";

export enum Difficulty {
  Easy = 1,
  Medium = 2,
  Hard = 3,
  Genius = 4,
}

export type GameError = {
  step: number;
  message: string;
};

export type ConnectionItem = {
  word: string;
  selected: boolean;
};

export type StepDifficultyMap = Map<
  number,
  { wordLimit: number; wordStrength: number; mistakes: number }
>;

export type CorrectGuess = {
  connectionGroupName: string;
  userConnectionGuesses: string[];
};

export interface GameState {
  isLoading: boolean;
  isSuccess: boolean;
  errors: GameError[];
  step: number;
  furthestStep: number;
  isLightMode: boolean;
  connectionBoard: ConnectionItem[];
  connectionGroup: string[];
  connectionGuessGroup: Record<string, string[]>;
  difficulty: Difficulty;
  userConnectionGuesses: string[];
  userIncorrectGuesses: string[];
  correctGuesses: CorrectGuess[];
  didWin: boolean;
  stepDifficulties: StepDifficultyMap;
  setIsLoading: (isLoading: boolean) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  setError: (step: number, error: GameError) => void;
  setStep: (step: number) => void;
  setFurthestStep: (furthestStep: number) => void;
  setIsLightMode: (isLightMode: boolean) => void;
  setDidWin: (didWin: boolean) => void;
  setConnectionBoard: (board: ConnectionItem[]) => void;
  setConnectionGroup: (group: string[]) => void;
  setConnectionGuessGroup: (guessGroup: Record<string, string[]>) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setUserConnectionGuesses: (guesses: string[]) => void;
  setUserIncorrectGuesses: (guesses: string[]) => void;
  setCorrectGuesses: (correctGuesses: CorrectGuess[]) => void;
  setStepDifficulties: (stepDifficulties: StepDifficultyMap) => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set, get) => {
  const initialStepDifficulties: StepDifficultyMap = new Map([
    [0, { wordLimit: 5, wordStrength: 999, mistakes: 4 }],
    [1, { wordLimit: 5, wordStrength: 999, mistakes: 4 }],
  ]);

  const initialGameState = {
    isLoading: false,
    isSuccess: false,
    errors: [],
    step: 0,
    furthestStep: 0,
    isLightMode: false,
    connectionBoard: [],
    connectionGroup: [],
    connectionGuessGroup: { triggerWord: ["guess", "guess", "guess"] },
    userConnectionGuesses: [],
    userIncorrectGuesses: [],
    correctGuesses: [],
    stepDifficulties: initialStepDifficulties,
    difficulty: Difficulty.Medium,
    didWin: false,
  };

  return {
    ...initialGameState,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    setIsSuccess: (isSuccess: boolean) => set({ isSuccess }),
    setError: (step: number, error: GameError) => {
      let errorsCopy = [...get().errors];
      errorsCopy = errorsCopy.filter((error) => error.step !== step);
      if (error.message) errorsCopy.push(error);
      set({ errors: errorsCopy });
    },
    setStep: (step: number) => set({ step }),
    setFurthestStep: (furthestStep: number) => set({ furthestStep }),
    setIsLightMode: (isLightMode: boolean) => set({ isLightMode }),
    setDidWin: (didWin: boolean) => set({ didWin }),
    setConnectionBoard: (connectionBoard: ConnectionItem[]) =>
      set({ connectionBoard }),
    setConnectionGroup: (connectionGroup: string[]) => set({ connectionGroup }),
    setConnectionGuessGroup: (connectionGuessGroup: Record<string, string[]>) =>
      set({ connectionGuessGroup }),
    setDifficulty: (difficulty: Difficulty) => set({ difficulty }),
    setUserConnectionGuesses: (guesses: string[]) =>
      set({ userConnectionGuesses: guesses }),
    setUserIncorrectGuesses: (guesses: string[]) =>
      set({ userIncorrectGuesses: guesses }),
    setCorrectGuesses: (correctGuesses: CorrectGuess[]) =>
      set({ correctGuesses }),
    setStepDifficulties: (stepDifficulties: StepDifficultyMap) =>
      set({ stepDifficulties }),
    reset: () => set({ ...initialGameState }),
  };
});
