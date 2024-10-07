import { create } from "zustand";

export type GameError = {
  step: number;
  message: string;
};

export type ConnectionItem = {
  word: string;
  selected: boolean;
  isAnimating?: boolean;
};

export type Difficulty = "Easy" | "Medium" | "Hard";
export type DifficultySettings = {
  wordLimit: number;
  wordStrength: number;
  mistakes: number;
};
export type StepSettings = Record<number, DifficultySettings>;
export type StepDifficulties = Record<Difficulty, StepSettings>;

export type CorrectGuess = {
  connectionGroupName: string;
  userConnectionGuesses: string[];
};

export type ConnectionsStatus = "Idle" | "Playing" | "Won" | "Lost";

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
  connectionsStatus: ConnectionsStatus;
  difficulty: Difficulty;
  userConnectionGuesses: string[];
  userIncorrectGuesses: string[];
  correctGuesses: CorrectGuess[];
  mistakes: number;
  didWin: boolean;
  isSoundOn: boolean;
  isAdminMode: boolean;
  isResetting: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  setError: (step: number, error: GameError) => void;
  setStep: (step: number) => void;
  setFurthestStep: (furthestStep: number) => void;
  setIsLightMode: (isLightMode: boolean) => void;
  setMistakes: (connectionMistakes: number) => void;
  setDidWin: (didWin: boolean) => void;
  setConnectionBoard: (board: ConnectionItem[]) => void;
  setConnectionGroup: (group: string[]) => void;
  setConnectionGuessGroup: (guessGroup: Record<string, string[]>) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setUserConnectionGuesses: (guesses: string[]) => void;
  setUserIncorrectGuesses: (guesses: string[]) => void;
  setCorrectGuesses: (correctGuesses: CorrectGuess[]) => void;
  setConnectionsStatus: (connectionsStatus: ConnectionsStatus) => void;
  setIsSoundOn: (isSoundOn: boolean) => void;
  setIsAdminMode: (isAdminMode: boolean) => void;
  setIsResetting: (isResetting: boolean) => void;
  resetStep: () => void;
  reset: () => void;
}

export const STEP_DIFFICULTIES: StepDifficulties = {
  Easy: {
    0: { wordLimit: 5, wordStrength: 999, mistakes: 6 },
    1: { wordLimit: 5, wordStrength: 999, mistakes: 6 },
  },
  Medium: {
    0: { wordLimit: 5, wordStrength: 999, mistakes: 4 },
    1: { wordLimit: 5, wordStrength: 999, mistakes: 4 },
  },
  Hard: {
    0: { wordLimit: 5, wordStrength: 999, mistakes: 2 },
    1: { wordLimit: 5, wordStrength: 999, mistakes: 2 },
  },
};

export const useGameStore = create<GameState>((set, get) => {
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
    connectionsStatus: "Playing" as ConnectionsStatus,
    userConnectionGuesses: [],
    userIncorrectGuesses: [],
    correctGuesses: [],
    difficulty: "Medium" as Difficulty,
    mistakes: STEP_DIFFICULTIES["Medium"][0].mistakes,
    didWin: false,
    isSoundOn: false,
    isAdminMode: true,
    isResetting: false,
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
    setConnectionsStatus: (connectionsStatus: ConnectionsStatus) =>
      set({ connectionsStatus }),
    setMistakes: (mistakes: number) => set({ mistakes }),
    setIsSoundOn: (isSoundOn: boolean) => set({ isSoundOn }),
    setIsAdminMode: (isAdminMode: boolean) => set({ isAdminMode }),
    setIsResetting: (isResetting: boolean) => set({ isResetting }),
    reset: () => set({ ...initialGameState }),
    resetStep: () =>
      set({
        ...initialGameState,
        isResetting: true,
        step: get().step,
        isAdminMode: get().isAdminMode,
      }),
  };
});
