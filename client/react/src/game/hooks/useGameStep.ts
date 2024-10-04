import { useGameStore } from "../store";

export default function useGameStep() {
  const {
    errors,
    step: currStep,
    furthestStep,
    setStep,
    setFurthestStep,
    setIsLoading,
  } = useGameStore((state) => state);

  const handleStepClick = (index: number): void => {
    setIsLoading(true);
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

  return { handleStepClick };
}
