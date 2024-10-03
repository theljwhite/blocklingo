import { useGameStore } from "../store";
import useDifficulties from "./useDifficulties";

export default function useNextGameStep(
  validateSteps: Array<(arg?: any) => string | undefined>
) {
  const { difficulty, step, setStep, furthestStep, setFurthestStep, setError } =
    useGameStore((state) => state);

  const { handleDifficultyChange } = useDifficulties();

  const onNextStep = (arg?: any) => {
    let isError = false;

    for (const validateStep of validateSteps) {
      const errorMessage = validateStep(arg);

      if (errorMessage) {
        setError(step, { step, message: errorMessage });
        isError = true;
        break;
      }

      if (!isError) {
        setError(step, { step, message: "" });
        const nextStep = step + 1;
        setStep(nextStep);

        handleDifficultyChange(difficulty);

        if (nextStep > furthestStep) {
          setFurthestStep(nextStep);
        }
      }
    }
  };

  return onNextStep;
}
