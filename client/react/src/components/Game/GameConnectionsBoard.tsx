import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../game/store";
import useGuessConnection from "../../game/hooks/useGuessConnection";
import useGameStep from "../../game/hooks/useGameStep";
import {
  CONNECTION_BOARD_WIDTH,
  CORRECT_GUESS_COLORS,
} from "../../game/data/constants";
import {
  correctGuessAnimation,
  incorrectGuessAnimation,
  correctGuessTransition,
  connGroupTransition,
  liWordAnimation,
  listItemVariants,
  listVariants,
  slowDispappearTransition,
} from "../../game/data/animations/connections";
import { ROUTE_LEADERBOARD } from "../../constants/routes";
import tailwindConfig from "../../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
import { motion, AnimatePresence } from "framer-motion";
import GameBoardButton from "./GameBoardButton";
import GameConnectionsResult from "./GameConnectionsResult";

export default function GameConnectionsBoard() {
  const {
    step,
    connectionBoard,
    correctGuesses,
    mistakes,
    userConnectionGuesses,
    userIncorrectGuesses,
    connectionsStatus,
  } = useGameStore((state) => state);
  const { shuffle, select, deselectAll, guess } = useGuessConnection();

  const { handleStepClick } = useGameStep();
  const navigate = useNavigate();

  const tailwindTheme = resolveConfig(tailwindConfig).theme;

  const won = connectionsStatus === "Won";
  const lost = connectionsStatus === "Lost";
  const gameIsOver = won || lost;

  const rowCount = connectionBoard.length / 4;
  const boardHeight = `calc(${rowCount - 1} * 8px + ${rowCount} * 80px)`;

  return (
    <div>
      <section className="text-center text-lg text-neutral-22 font-second">
        <h2>Create groups of four!</h2>
        <fieldset
          style={{
            width: CONNECTION_BOARD_WIDTH,
            height: "calc(3 * 8px + 4 * 80px)",
          }}
          className="my-6 relative"
        >
          <legend className="invisible">More instructions</legend>

          {gameIsOver ? (
            <GameConnectionsResult />
          ) : (
            correctGuesses.length > 0 && (
              <article className="block">
                <ol
                  style={{
                    width: CONNECTION_BOARD_WIDTH,
                    height: "calc(3 * 8px + 4 * 80px)",
                  }}
                  className="grid gap-2 grid-rows-4 absolute bottom-0 grid-cols-1 list-none min-w-[0px] min-h-[0px]"
                >
                  {correctGuesses.map((item, index) => {
                    return (
                      <motion.section
                        animate={{ opacity: 100 }}
                        key={index}
                        className="uppercase flex opacity-0 flex-col items-center justify-center text-lg text-almostblack overflow-hidden font-second rounded-xl"
                        style={{ backgroundColor: CORRECT_GUESS_COLORS[index] }}
                      >
                        <motion.h3
                          animate={liWordAnimation}
                          transition={connGroupTransition}
                          className="font-bold text-black"
                        >
                          {item.connectionGroupName}
                        </motion.h3>
                        <motion.ol
                          initial="closed"
                          animate="open"
                          variants={listVariants}
                          className="list-none"
                        >
                          {item.userConnectionGuesses.map((word, index) => {
                            return (
                              <motion.li
                                variants={listItemVariants}
                                key={index}
                                className="inline after:content-[',_'] last:after:content-none"
                              >
                                {word}
                              </motion.li>
                            );
                          })}
                        </motion.ol>
                      </motion.section>
                    );
                  })}
                </ol>
              </article>
            )
          )}

          <div>
            <div
              style={{
                width: CONNECTION_BOARD_WIDTH,
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
          {gameIsOver ? (
            <p className="flex items-center gap-2 text-neutral-22">
              You {connectionsStatus.toLowerCase()} the connections stage!
            </p>
          ) : (
            <p className="flex items-center font-second gap-2 text-neutral-22">
              Mistakes remaining:
              <span className="flex gap-2.5 min-w-[120px]">
                <AnimatePresence>
                  {Array(mistakes)
                    .fill("")
                    .map((_, index) => {
                      return (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={slowDispappearTransition}
                          key={`mistake-${index}`}
                          className="w-4 h-4 rounded-full bg-primary-2"
                        />
                      );
                    })}
                </AnimatePresence>
              </span>
            </p>
          )}
        </span>
      </section>
      {gameIsOver ? (
        <section className="flex justify-center gap-2.5">
          <GameBoardButton
            type="button"
            text="View Results"
            onClick={() => navigate(ROUTE_LEADERBOARD)}
            disabled={false}
            bgClass="bg-almostblack"
            textColorClass="text-neutral-22"
            borderColorClass="border-neutral-22"
          />
          <GameBoardButton
            type="button"
            text="Next stage"
            onClick={() => handleStepClick(step + 1)}
            disabled={false}
            bgClass="bg-almostblack"
            textColorClass="text-primary-1"
            borderColorClass="border-primary-1"
          />
        </section>
      ) : (
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
      )}
    </div>
  );
}
