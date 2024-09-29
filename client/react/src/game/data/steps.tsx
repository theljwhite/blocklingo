export type GameStep = {
  id: number;
  instruction: string;
  surface: JSX.Element;
};

export const gameSteps: GameStep[] = [
  {
    id: 0,
    instruction: "Create groups of four!",
    surface: <span>TODO surface</span>,
  },
  {
    id: 1,
    instruction: "Guess the word!",
    surface: <span>TODO surface</span>,
  },
];
