import { type CorrectGuess, useGameStore } from "../../game/store";
import { motion } from "framer-motion";
import {
  showGuessesStaggerVariant,
  showGuessesSectionVariant,
  showGuessesListItemVariants,
  showGuessesListVariants,
  showGuessesWordAnimation,
} from "../../game/data/animations/connections";
import {
  CONNECTION_BOARD_WIDTH,
  CORRECT_GUESS_COLORS,
} from "../../game/data/constants";

export default function GameConnectionsResult() {
  const { correctGuesses, connectionGuessGroup, connectionsStatus } =
    useGameStore((state) => state);

  const guessesToDisplay: CorrectGuess[] =
    connectionsStatus === "Won"
      ? correctGuesses
      : Object.keys(connectionGuessGroup).map((groupName) => ({
          connectionGroupName: groupName,
          userConnectionGuesses: connectionGuessGroup[groupName],
        }));

  return (
    <article className="block">
      <motion.ol
        initial="hidden"
        animate="visible"
        variants={showGuessesStaggerVariant}
        style={{
          width: CONNECTION_BOARD_WIDTH,
          height: "calc(3 * 8px + 4 * 80px)",
        }}
        className="grid gap-2 grid-rows-4 absolute bottom-0 grid-cols-1 list-none min-w-[0px] min-h-[0px]"
      >
        {guessesToDisplay.map((item, index) => {
          return (
            <motion.section
              variants={showGuessesSectionVariant}
              key={`result-${index}`}
              className={`uppercase flex opacity-0 flex-col items-center justify-center text-lg text-almostblack overflow-hidden font-second rounded-xl`}
              style={{ backgroundColor: CORRECT_GUESS_COLORS[index] }}
            >
              <motion.h3
                animate={showGuessesWordAnimation}
                className="font-bold text-black"
              >
                {item.connectionGroupName}
              </motion.h3>
              <motion.ol
                initial="closed"
                animate="open"
                variants={showGuessesListVariants}
                className="list-none"
              >
                {item.userConnectionGuesses.map((word, index) => {
                  return (
                    <motion.li
                      variants={showGuessesListItemVariants}
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
      </motion.ol>
    </article>
  );
}
