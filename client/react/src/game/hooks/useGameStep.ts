import { useGameStore } from "../store";
import { useGameAudio } from "../store/AudioContext";

//TODO - add step validation eventually

export default function useGameStep() {
  const {
    errors,
    step: currStep,
    furthestStep,
    setStep,
    setFurthestStep,
  } = useGameStore((state) => state);

  const { play: playSound } = useGameAudio();

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

      playSound("reveal");

      if (index > furthestStep) {
        setFurthestStep(index);
      }
    }
  };

  return { handleStepClick };
}
