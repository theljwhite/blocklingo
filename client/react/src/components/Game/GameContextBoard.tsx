import { useState } from "react";
import { useGameStore } from "../../game/store";
import useContextGame from "../../game/hooks/useContextGame";
import {
  CONTEXT_WORST_SIMILARITY_SCORE,
  CONTEXT_INCORRECT_GUESSES_ALLOWED,
} from "../../game/data/constants";
import { motion } from "framer-motion";
import {
  correctGuessAnimation,
  correctGuessTransition,
} from "../../game/data/animations/connections";
import { REGEX_ONLY_ALPHABET } from "../../constants/regex";
import GamePuzzleResult from "./GamePuzzleResult";
import { SvgProjectLogo } from "../UI/Icons/index";
import { LoadingSpinner } from "../UI/Spinners";
import { toastError } from "../UI/Toast/Toast";

//TODO - fine tune animations here
// - rate limit submit form in the future

export default function GameContextBoard() {
  const [isGuessValid, setIsGuessValid] = useState<boolean>(true);
  const {
    isCalculating,
    contextCurrentGuess,
    contextGuesses,
    contextCurrentGuessObj,
    contextGameStatus,
    isAdminMode,
    setContextCurrentGuess,
  } = useGameStore((state) => state);

  const { getGuessSimilarityAndUpdate, isWordGuessed } = useContextGame();
  const showResults = contextGameStatus !== "Playing";

  const handleGuessSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!isGuessValid) {
      toastError("Invalid entry.", true);
      setContextCurrentGuess("");
      setIsGuessValid(true);
      return;
    }

    if (isWordGuessed(contextCurrentGuess)) return;

    getGuessSimilarityAndUpdate();
  };

  const onGuessChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setContextCurrentGuess(value);

    if (!REGEX_ONLY_ALPHABET.test(value) && value.length > 0) {
      setIsGuessValid(false);
    } else setIsGuessValid(true);
  };

  const handleGuessScoreBar = (
    score: number
  ): {
    width: number;
    bgClass: string;
  } => {
    let bgClass = "bg-primary-5";
    const scaledScore = Math.log10(score + 1);
    const maxScaledScore = Math.log10(CONTEXT_WORST_SIMILARITY_SCORE + 1);
    let widthPercentage = (1 - scaledScore / maxScaledScore) * 100;

    if (score <= 1) widthPercentage = 100;
    if (score < 1000) {
      bgClass = "bg-success-1";
    } else if (score < 4000) {
      bgClass = "bg-orange-600";
    } else if (score > 10_000) {
      widthPercentage = 1;
      bgClass = "bg-primary-5";
    }

    const clampedWidth = Math.min(100, Math.max(1, widthPercentage));

    return {
      width: clampedWidth,
      bgClass,
    };
  };

  return (
    <>
      {showResults ? (
        <GamePuzzleResult />
      ) : (
        <section className="text-center text-lg text-neutral-22 font-second">
          <h2 className="font-bold mb-2">Guess the secret word!</h2>
          <div className="m-auto max-w-[500px] px-4 flex justify-center items-center">
            <div className="min-h-[calc(100svh - 210px)] ">
              <div className="pt-2.5 px-2.5 text-neutral-22 flex flex-row gap-2 mb-2">
                <span className="text-md">
                  {isAdminMode ? (
                    <p className="text-md text-start">
                      Guess #{contextGuesses.length + 1}
                    </p>
                  ) : (
                    <p className="text-md text-start">
                      Guess #{contextGuesses.length + 1} (
                      {CONTEXT_INCORRECT_GUESSES_ALLOWED -
                        contextGuesses.length -
                        1}{" "}
                      remaining)
                    </p>
                  )}
                </span>
              </div>
              <form onSubmit={handleGuessSubmit} className="min-w-[500px]">
                <div className="relative">
                  <div
                    className={`${
                      isGuessValid ? "border-neutral-22" : "border-error-1"
                    } flex w-full overflow-hidden rounded-lg border-2`}
                  >
                    <div className="my-auto bg-neutral-12 border-none w-12 h-14 py-1.5 text-center text-[1.125rem] leading-7">
                      <span className="align-[-0.7em] inline-block">
                        <SvgProjectLogo size={24} />
                      </span>
                    </div>
                    <input
                      autoComplete="off"
                      spellCheck="false"
                      autoCapitalize="off"
                      id="context-guess-entry"
                      type="text"
                      placeholder="guess a word"
                      className="bg-neutral-12 block w-full text-md pt-2 pb-2 pr-2 text-white outline-none"
                      value={contextCurrentGuess}
                      onChange={onGuessChange}
                    />
                  </div>
                </div>
              </form>
              <div className="flex flex-col min-h-[50px] justify-center my-10">
                {isCalculating ? (
                  <div className="flex flex-row gap-2">
                    <LoadingSpinner size={20} /> Calculating...
                  </div>
                ) : contextCurrentGuessObj ? (
                  <motion.div
                    initial={{ borderColor: "#FFF" }}
                    animate={
                      contextCurrentGuessObj.animate
                        ? correctGuessAnimation
                        : { borderColor: "#FFF" }
                    }
                    transition={
                      contextCurrentGuessObj.selected && correctGuessTransition
                    }
                    className="rounded-lg border-[3px] border-white overflow-hidden relative mt-2"
                  >
                    <div
                      id="outer"
                      className="bg-neutral-20 h-full w-full absolute"
                    >
                      <div
                        id="inner"
                        style={{
                          width: `${
                            handleGuessScoreBar(
                              contextCurrentGuessObj.rankScore
                            ).width
                          }%`,
                        }}
                        className={`${
                          handleGuessScoreBar(contextCurrentGuessObj.rankScore)
                            .bgClass
                        } w-[1%] h-full min-w-[1%] rounded-r-lg`}
                      />
                    </div>
                    <div
                      id="row"
                      className="flex items-center justify-between h-10 px-2.5 py-1.5 relative w-full"
                    >
                      <span className="text-md lowercase font-bold">
                        {contextCurrentGuessObj.word}
                      </span>
                      <span className="text-md font-bold">
                        {contextCurrentGuessObj.rankScore}
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="px-1.5">
                    Enter a word above to guess for the secret!
                  </div>
                )}
              </div>
              <div className="pb-5">
                {contextGuesses.map((guess, index) => {
                  const { width, bgClass } = handleGuessScoreBar(
                    guess.rankScore
                  );
                  return (
                    <div
                      key={index}
                      className={`${
                        guess.selected
                          ? "border-[3px] border-almostwhite"
                          : "border-none"
                      } rounded-lg overflow-hidden relative mt-2`}
                    >
                      <div
                        id="outer"
                        className="bg-neutral-20 h-full w-full absolute"
                      >
                        <div
                          id="inner"
                          style={{ width: `${width}%` }}
                          className={`${bgClass} h-full min-w-[1%] rounded-r-lg`}
                        />
                      </div>
                      <div
                        id="row"
                        className="flex items-center justify-between h-10 px-2.5 py-1.5 relative w-full"
                      >
                        <span className="text-md lowercase font-bold">
                          {guess.word}
                        </span>
                        <span className="text-md font-bold">
                          {guess.rankScore}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
