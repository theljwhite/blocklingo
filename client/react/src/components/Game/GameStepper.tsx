import { useState } from "react";
import { useGameStore } from "../../game/store";
import GameLoading from "./GameLoading";
import GameConnectionsBoard from "./GameConnectionsBoard";

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
    content: <span>TODO: Wordgame</span>,
  },
  {
    id: 2,
    title: "Find context",
    content: <span>TODO: Context</span>,
  },
];

export default function GameStepper() {
  const [gameLoading, setGameLoading] = useState<boolean>(false);
  const {
    isLoading,
    errors,
    step: currStep,
    furthestStep,
    setStep,
    setFurthestStep,
  } = useGameStore((state) => state);

  const handleStepClick = (index: number): void => {
    if (index < currStep) {
      setStep(index);
      return;
    }

    for (
      let stepToValidate = currStep;
      stepToValidate <= index;
      stepToValidate++
    ) {
      // const errorMessage = validateStep(stepToValidate, state);
      // if (errorMessage){
      // setStep(stepToValidate);
      //  return;
      // }

      setStep(index);

      if (index > furthestStep) {
        setFurthestStep(index);
      }
    }
  };

  if (gameLoading) return <GameLoading />;

  return gameSteps[currStep].content;
}
