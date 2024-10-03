import { GameLoadingCircles } from "../UI/Spinners";

export default function GameLoading() {
  return (
    <div className="mt-[5rem] flex flex-col gap-8 justify-center items-center">
      <div className="text-primary-1">
        <GameLoadingCircles size={300} />
      </div>

      <h1 className="font-main text-3xl text-neutral-22 animate-pulse">
        Loading Blocklingo...
      </h1>
    </div>
  );
}
