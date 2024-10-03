import { useEffect } from "react";
import { useGameStore } from "../../game/store";
import useCreateConnection from "../../game/hooks/useCreateConnection";
import useGuessConnection from "../../game/hooks/useGuessConnection";
import useDifficulties from "../../game/hooks/useDifficulties";
import tailwindConfig from "../../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
import { motion } from "framer-motion";
import GameBoardButton from "./GameBoardButton";

export default function GameConnectionsBoard() {
  const {
    difficulty,
    connectionBoard,
    correctGuesses,
    mistakes,
    userConnectionGuesses,
    userIncorrectGuesses,
  } = useGameStore((state) => state);
  const { shuffle, select, deselectAll, guess } = useGuessConnection();
  const { createConnectionsBoard } = useCreateConnection();
  const { getDifficultySettings } = useDifficulties();

  useEffect(() => {
    createConnections();
  }, []);

  const tailwindTheme = resolveConfig(tailwindConfig).theme;
  const incorrectGuessAnimation = {
    borderColor: tailwindTheme.colors.error[1],
    x: [0, 10, -10, 0],
  };
  const correctGuessAnimation = {
    borderColor: tailwindTheme.colors.success[1],
    x: [0, 5, -5, 0],
    // y: [0, -20, -40, -80],
  };
  const correctGuessTransition = {
    duration: 0.5,
    times: [0, 0.2, 0.4, 1],
  };

  const connGroupTransition = {
    duration: 0.5,
    delay: 0.2,
  };
  const liWordAnimation = {
    color: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"],
  };
  const liWordTransition = {
    duration: 0.8,
    delay: 0.8,
    ease: "easeIn",
  };

  const rowCount = connectionBoard.length / 4;
  const boardHeight = `calc(${rowCount - 1} * 8px + ${rowCount} * 80px)`;
  const boardWidth = "calc(3 * 8px + 4 * 150px)";
  const correctGuessColors = [
    "#bbf7d0",
    "#fed7aa",
    "#bae6fd",
    "#e9d5ff",
    "#fbcfe8",
    "#99f6e4",
  ];

  const createConnections = async (): Promise<any> => {
    const used = new Set<number>();
    const difficultySettings = getDifficultySettings(difficulty);

    await createConnectionsBoard(used, difficultySettings.wordLimit ?? 5);
  };

  return (
    <div>
      <section className="text-center text-lg text-neutral-22 font-second">
        <h2>Create groups of four!</h2>
        <fieldset
          style={{
            width: boardWidth,
            height: "calc(3 * 8px + 4 * 80px)",
          }}
          className="my-6 relative"
        >
          <legend className="invisible">More instructions</legend>

          {correctGuesses.length > 0 && (
            <article className="block">
              <ol
                style={{
                  width: boardWidth,
                  height: "calc(3 * 8px + 4 * 80px)",
                }}
                className="grid gap-2 grid-rows-4 absolute bottom-0 grid-cols-1 list-none min-w-[0px] min-h-[0px]"
              >
                {correctGuesses.map((item, index) => {
                  return (
                    <motion.section
                      animate={{ opacity: 100 }}
                      // transition={{ ease: "easeIn" }}
                      key={index}
                      className={`uppercase flex opacity-0 flex-col items-center justify-center text-lg text-almostblack overflow-hidden font-second rounded-xl`}
                      style={{ backgroundColor: correctGuessColors[index] }}
                    >
                      <motion.h3
                        animate={liWordAnimation}
                        transition={connGroupTransition}
                        className="font-bold text-black"
                      >
                        {item.connectionGroupName}
                      </motion.h3>
                      <ol className="list-none">
                        {/* <li className="inline">
                          {item.userConnectionGuesses.join(", ")}
                        </li> */}
                        {item.userConnectionGuesses.map((word, index) => {
                          return (
                            <motion.li
                              initial={{ color: "rgba(0, 0, 0, 0)" }}
                              animate={liWordAnimation}
                              transition={liWordTransition}
                              key={index}
                              className="inline after:content-[',_'] last:after:content-none"
                            >
                              {word}
                            </motion.li>
                          );
                        })}
                      </ol>
                    </motion.section>
                  );
                })}
              </ol>
            </article>
          )}

          <div>
            <div
              style={{
                width: boardWidth,
                height: boardHeight,
              }}
              className={`grid-rows-${rowCount} grid gap-2 absolute bottom-0 grid-cols-4 min-h-[0px] min-w-[0px]`}
            >
              {connectionBoard.map((item, index) => {
                return (
                  <motion.label
                    initial={{
                      borderColor: tailwindTheme.colors.primary[1],
                    }}
                    animate={
                      item.isAnimating
                        ? correctGuessAnimation
                        : userIncorrectGuesses.includes(item.word)
                        ? incorrectGuessAnimation
                        : {
                            borderColor: tailwindTheme.colors.primary[1],
                          }
                    }
                    transition={item.isAnimating && correctGuessTransition}
                    exit={item.isAnimating && { opacity: 0 }}
                    key={index}
                    className={`${
                      item.selected ? "bg-zinc-800" : "bg-almostblack"
                    } ${
                      userConnectionGuesses.length < 4 || item.selected
                        ? "cursor-pointer"
                        : "cursor-default"
                    } min-w-[0px] overflow-hidden flex justify-center items-center flex-wrap rounded-xl relative font-bold uppercase border-4 border-primary-1 text-neutral-22`}
                  >
                    <input
                      id={`item-word-${index}`}
                      onClick={() => select(item.word)}
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
              {Array(mistakes)
                .fill("")
                .map((_, index) => {
                  return (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        ease: [0, 0.71, 0.2, 1.01],
                        scale: {
                          type: "spring",
                          damping: 5,
                          stiffness: 100,
                          restDelta: 0.001,
                        },
                      }}
                      key={index}
                      className="w-4 h-4 rounded-full bg-primary-2"
                    />
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
          onClick={shuffle}
          disabled={false}
          bgClass="bg-almostblack"
          textColorClass="text-neutral-22"
          borderColorClass="border-neutral-22"
        />
        <GameBoardButton
          type="button"
          text="Deselect all"
          onClick={deselectAll}
          disabled={userConnectionGuesses.length === 0}
          bgClass="bg-almostblack"
          textColorClass="text-neutral-22"
          borderColorClass="border-neutral-22"
        />
        <GameBoardButton
          type="button"
          text="Submit"
          onClick={guess}
          disabled={userConnectionGuesses.length < 4}
          bgClass="bg-almostblack"
          textColorClass="text-primary-1"
          borderColorClass="border-primary-1"
          disabledClass="disabled:text-neutral-22 disabled:opacity-50 disabled:bg-almostblack disabled:border-neutral-22"
        />
      </section>
    </div>
  );
}