import { CloseXOne } from "./Icons";

export default function Banner() {
  return (
    <div
      className="bg-[linear-gradient(104deg,_#FAD1A4,_#F7B974)] text-almostblack p-2 w-full h-9 z-10 relative"
      // className="bg-sleek-secondary text-neutral-22 p-2 w-full h-9 z-10 relative"
    >
      <div className="flex items-center justify-center flex-nowrap">
        <span className="font-second text-sm font-bold flex justify-center items-center">
          Achievements demo is now live! Play and solve puzzles to earn on-chain
          achievements. See more.
        </span>
      </div>
      <button className="h-7 w-7 absolute top-1 right-4">
        <CloseXOne size={14} />
      </button>
    </div>
  );
}
