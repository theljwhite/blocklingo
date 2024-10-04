import { useEffect } from "react";
import { useGameStore } from "../../game/store";
import useCreateConnection from "../../game/hooks/useCreateConnection";
import useDifficulties from "../../game/hooks/useDifficulties";

import GameLoading from "./GameLoading";
import GameConnectionsBoard from "./GameConnectionsBoard";
import GameContextBoard from "./GameContextBoard";

type GameStep = {
  id: number;
  title: string;
  content: JSX.Element;
};

const gameSteps: GameStep[] = [
  {
    id: 0,
    title: "Find connections",
    content: <GameConnectionsBoard />,
  },
  {
    id: 1,
    title: "Wordgame",
    content: <GameContextBoard />,
  },
  {
    id: 2,
    title: "Something else",
    content: <span>TODO: Something else</span>,
  },
];

export default function GameStepper() {
  const {
    difficulty,
    isLoading,
    errors,
    step: currStep,
  } = useGameStore((state) => state);
  const { getDifficultySettings } = useDifficulties();
  const { createConnectionsBoard } = useCreateConnection();

  useEffect(() => {
    initializeStep();
  }, []);

  const initializeStep = async (): Promise<void> => {
    const difficultySettings = getDifficultySettings(difficulty);
    const { wordLimit } = difficultySettings;

    const used = new Set<number>();

    if (currStep === 0) await createConnectionsBoard(used, wordLimit);
  };

  if (isLoading) return <GameLoading />;
  return gameSteps[currStep].content;
}
