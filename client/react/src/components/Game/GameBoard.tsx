import { useEffect } from "react";
import { useGameStore } from "../../game/store";
import { useCreateConnection } from "../../game/hooks/useCreateConnection";
import { useGuessConnection } from "../../game/hooks/useGuessConnection";
import tailwindConfig from "../../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
import { motion } from "framer-motion";
import GameStepper from "./GameStepper";
import GameBoardButton from "./GameBoardButton";

export default function GameBoard() {
  const {
    connectionBoard,
    correctGuesses,
    userIncorrectGuesses,
    stepDifficulties,
  } = useGameStore((state) => state);
  const { guess } = useGuessConnection();
  const { createConnectionsBoard } = useCreateConnection();

  const tailwindTheme = resolveConfig(tailwindConfig).theme;

  const TEMP_M = ["lol", "lol", "lol", "lol"];

  useEffect(() => {
    // createConnections();
  }, []);

  const createConnections = async (): Promise<any> => {
    const step = 0; //TODO this is hardcoded for now
    const stepDifficulty = stepDifficulties.get(step);
    const used = new Set<number>();
    await createConnectionsBoard(used, stepDifficulty?.wordLimit ?? 5);
  };

  return (
    <div>
      <section className="text-center text-lg text-neutral-22 font-second">
        <h2>Create groups of four!</h2>
        <fieldset
          style={{
            width: "calc(3 * 8px + 4 *  150px)",
            height: "calc(3 * 8px + 4 * 80px)",
          }}
          className="my-6 relative"
          // className="relative my-6 w-[600px] h-[600px]"
        >
          <legend className="invisible">More instructions</legend>

          {/* <article className="block">
            <ol
              style={{
                width: "calc(3 * 8px + 4 * 144px)",
                height: "calc(3 * 8px + 4 * 144px)",
              }}
              className="grid gap-2 grid-rows-4 absolute top-0 grid-cols-1"
            >
              <section className="bg-green-200 uppercase flex flex-col items-center justify-center text-lg text-almostblack overflow-hidden font-second rounded-xl">
                <h3 className="font-bold">The solution phrase or word</h3>
                <ol className="list-none">
                  <li className="inline">the,</li>
                  <li className="inline">words,</li>
                </ol>
              </section>
            </ol>
          </article> */}

          <div>
            <div
              style={{
                width: "calc(3 * 8px + 4 *  150px)",
                height: "calc(3 * 8px + 4 * 80px)",
              }}
              className=" grid grid-rows-4 gap-2 absolute bottom-0 grid-cols-4 min-h-[0px] min-w-[0px]"
              // className="h-[600px] w-[600px] grid grid-rows-4 gap-2 absolute bottom-0 grid-cols-4 min-h-[0px] min-w-[0px]"
            >
              {connectionBoard.map((item, index) => {
                return (
                  <motion.label
                    initial={{
                      borderColor: tailwindTheme.colors.primary[1],
                    }}
                    animate={
                      userIncorrectGuesses.includes(item.word)
                        ? {
                            borderColor: tailwindTheme.colors.error[1],
                            x: [0, 10, -10, 0],
                          }
                        : {
                            borderColor: tailwindTheme.colors.primary[1],
                          }
                    }
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
                  </motion.label>
                );
              })}
            </div>
          </div>
        </fieldset>
      </section>
      <section className="block">
        <span className="flex justify-center mb-6">
          <p className="flex items-center gap-2 text-neutral-22">
            Mistakes remaining:
            <span className="flex gap-2.5 min-w-[120px]">
              {TEMP_M.map((item, index) => {
                return (
                  <span
                    key={index}
                    className="w-4 h-4 rounded-full bg-primary-2"
                  ></span>
                );
              })}
            </span>
          </p>
        </span>
      </section>
      <section className="flex justify-center gap-2.5">
        <GameBoardButton
          type="button"
          text="Shuffle"
          onClick={() => console.log("C")}
          disabled={false}
          bgClass="bg-almostblack"
          textColorClass="text-neutral-22"
          borderColorClass="border-neutral-22"
        />
        <GameBoardButton
          type="button"
          text="Deselect all"
          onClick={() => console.log("C")}
          disabled={true}
          bgClass="bg-almostblack"
          textColorClass="text-neutral-22"
          borderColorClass="border-neutral-22"
        />
        <GameBoardButton
          type="button"
          text="Submit"
          onClick={() => console.log("C")}
          disabled={true}
          bgClass="bg-almostblack"
          textColorClass="text-primary-1"
          borderColorClass="border-primary-1"
          disabledClass="disabled:text-neutral-22 disabled:opacity-50 disabled:bg-almostblack disabled:border-neutral-22"
        />
      </section>
    </div>
  );
}
