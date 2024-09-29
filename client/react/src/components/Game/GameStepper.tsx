import { useGameStore } from "../../game/store";

export default function GameStepper({ steps }) {
  const { step: currStep, furthestStep } = useGameStore();

  const handleStepClick = (index: number): void => {
    if (index < currStep) {
      //setStep(index)
      return;
    }

    for (
      let stepToValidate = currStep;
      stepToValidate <= index;
      stepToValidate++
    ) {
      // const errorMessage = validateStep(stepToValidate, state);
      // if (errorMessage){
      // setStep(stepToValidate));
      //  return;
      // }
      //setStep(index);
      // if (index > furthestStep){
      //      setFurthestStep(index)
      //}
    }
  };

  return <div>Stepper</div>;
}
