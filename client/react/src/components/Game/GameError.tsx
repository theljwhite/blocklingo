import { useGameStore } from "../../game/store";
import { ErrorBubble } from "../UI/Icons";

export default function GameError() {
  const { errors } = useGameStore((state) => state);

  return (
    <div className="mt-[5rem] flex flex-col gap-8 justify-center items-center">
      <div className="text-error-1">
        <ErrorBubble size={300} />
      </div>

      <h1 className="font-main text-4xl text-neutral-22">
        Oops, we encountered an error.
      </h1>
      <div className="text-center flex flex-col">
        {errors.map((error, index) => {
          return (
            <p className="text-lg text-neutral-22 font-second" key={index}>
              {error.message}
            </p>
          );
        })}
        <p className="text-lg text-neutral-22 font-second">
          Please wait a moment and refresh the page.
        </p>
      </div>
    </div>
  );
}
