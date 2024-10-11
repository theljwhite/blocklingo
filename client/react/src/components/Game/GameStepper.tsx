import { useEffect } from "react";
import { useGameStore } from "../../game/store";
import { useSession } from "../../managers/auth/useSession";
import useCreateConnection from "../../game/hooks/useCreateConnection";
import useDifficulties from "../../game/hooks/useDifficulties";
import GameLoading from "./GameLoading";
import GameError from "./GameError";
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
    step,
    isAdminMode,
    isResetting,
    setIsResetting,
  } = useGameStore((state) => state);
  const { getDifficultySettings } = useDifficulties();
  const { createConnectionsBoard, createConnectionsBoardDb } =
    useCreateConnection();

  const { session } = useSession();

  useEffect(() => {
    if (session.user?.id) initializeStep();
  }, [session.user?.id]);

  useEffect(() => {
    if (isResetting) initializeStep();
  }, [isResetting, step, isAdminMode]);

  const initializeStep = async (): Promise<void> => {
    const difficultySettings = getDifficultySettings(difficulty);
    const { wordLimit } = difficultySettings;

    const used = new Set<number>();

    await determineAndRunDataSource(used, wordLimit);

    setIsResetting(false);
  };

  const determineAndRunDataSource = async (
    used: Set<number>,
    wordLimit: number
  ): Promise<void> => {
    const fetchDataForStep = async (): Promise<void> => {
      if (step === 0) {
        return isAdminMode
          ? await createConnectionsBoard(used, wordLimit)
          : await createConnectionsBoardDb();
      }

      //TODO other steps where init data is needed go here
    };

    await fetchDataForStep();
  };

  if (isLoading) return <GameLoading />;
  if (errors.length > 0) return <GameError />;
  return gameSteps[step].content;
}
