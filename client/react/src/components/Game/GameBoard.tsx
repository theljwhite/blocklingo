import { useEffect } from "react";
import { useGameStore } from "../../game/store";
import { useCreateConnection } from "../../game/hooks/useCreateConnection";
import { useGuessConnection } from "../../game/hooks/useGuessConnection";
import GameStepper from "./GameStepper";

export default function GameBoard() {
  const { connectionBoard } = useGameStore((state) => state);
  const { guess } = useGuessConnection();
  const { createConnectionsBoard } = useCreateConnection();

  useEffect(() => {
    // createConnections();
  }, []);

  const createConnections = async (): Promise<any> => {
    const used = new Set<number>();
    await createConnectionsBoard(used, 5);
  };

  return (
    <div>
      <section className="text-center text-lg text-neutral-22 font-second">
        <h2>Create groups of four!</h2>
        <fieldset
          // className="w-[calc(3* 8px + 4* 150px)] h-[calc(3* 8px + 4* 80px)]"
          className="relative my-6 w-[600px] h-[600px]"
        >
          <legend className="invisible">More instructions</legend>
          <div>
            <div
              // className="h-[calc(3* 8px + 4* 80px)] w-[calc(3* 8px + 4* 150px)]"
              className="h-[600px] w-[600px] grid grid-rows-4 gap-2 absolute bottom-0 grid-cols-4 min-h-[0px] min-w-[0px]"
            >
              {connectionBoard.map((item, index) => {
                return (
                  <label
                    key={index}
                    className={`${
                      item.selected ? "bg-zinc-800" : "bg-almostblack"
                    } min-w-[0px] overflow-hidden flex justify-center items-center flex-wrap rounded-xl relative cursor-pointer font-bold uppercase border-4 border-primary-1 text-neutral-22`}
                  >
                    <input
                      onClick={() => guess(item.word)}
                      className="hidden"
                    />
                    {item.word}
                  </label>
                );
              })}
            </div>
          </div>
        </fieldset>
      </section>
      <section></section>
      <section></section>
    </div>
  );
}
