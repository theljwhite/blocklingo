import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../game/store";
import useDbPuzzle from "../../game/hooks/useDbPuzzle";
import useDifficulties from "../../game/hooks/useDifficulties";
import useRewards from "../../game/hooks/useRewards";
import { useRewardsStore } from "../../game/store/rewards-store";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { doConfetti } from "../../game/data/misc/particles";
import { animateNumberValue } from "../../helpers/animate-value";
import { ROUTE_LEADERBOARD } from "../../constants/routes";

//TODO - animate this better

export default function GamePuzzleResult() {
  const {
    puzzleDetails,
    difficulty,
    contextGameStatus,
    contextGuesses,
    mistakes,
    reset,
    setIsResetting,
  } = useGameStore((state) => state);

  const { transactionHash } = useRewardsStore((state) => state);

  const { getEarnedPoints } = useDbPuzzle();
  const { getDifficultySettings } = useDifficulties();
  const { rewardUser } = useRewards();
  const { isConnected, address } = useAccount();
  const navigate = useNavigate();

  const mistakesRef = useRef<HTMLSpanElement | null>(null);
  const guessesRef = useRef<HTMLSpanElement | null>(null);
  const pointsRef = useRef<HTMLSpanElement | null>(null);

  const isWalletConnected = isConnected && address;

  const won = contextGameStatus === "Won";
  const lost = contextGameStatus === "Lost";
  const forfeited = contextGameStatus === "Forfeit";

  useEffect(() => {
    if (won) {
      doConfetti();

      const pointsEarned = getEarnedPoints();
      const difficultySettings = getDifficultySettings(difficulty ?? "Medium");
      const mistakesCount = difficultySettings.mistakes - mistakes;

      animateNumberValue(guessesRef, 0, contextGuesses.length, 4);
      animateNumberValue(mistakesRef, 0, mistakesCount, 4);
      animateNumberValue(pointsRef, 0, pointsEarned, 4);
    }
  }, []);

  return (
    <div className="flex relative mt-2">
      <div className="text-3xl text-white font-second">
        <motion.div
          initial={{ opacity: 0.0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
            scale: {
              type: "spring",
              damping: 12,
              stiffness: 100,
              restDelta: 0.001,
            },
          }}
          className="relative mx-auto block w-[30rem] rounded-xl border-2 border-zinc-700 p-10 shadow-lg backdrop-blur-md bg-transparent"
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center pb-4 text-white">
              <div className="flex items-center justify-center text-neutral-22 flex-row gap-1">
                <h1 className="text-2xl font-second">
                  Puzzle #{puzzleDetails?.id ?? 0} Results
                </h1>
              </div>
              <div className="text-center text-almostblack"></div>
              {won ? (
                <span className="text-zinc-400 text-sm">
                  You successfully{" "}
                  <span className="text-success-1">solved</span> the puzzle.
                  Great job!
                </span>
              ) : lost ? (
                <span className="text-zinc-400 text-sm">
                  You <span className="text-warn-1">failed</span> the puzzle
                  this time!
                </span>
              ) : (
                <span className="text-zinc-400 text-sm">
                  Try again another time!
                </span>
              )}
            </div>
            <section className="flex flex-col gap-3 border-b border-neutral-14 pb-6 text-xs">
              <p className="flex justify-between">
                <span className="text-zinc-400 text-lg">Puzzle:</span>
                <span className="text-lg text-neutral-22">
                  {import.meta.env.VITE_PROJECT_NAME} #{puzzleDetails?.id ?? 0}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-zinc-400 text-lg">Difficulty:</span>
                <span className="text-neutral-22 text-lg">
                  {puzzleDetails?.difficulty ?? "Medium"}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-zinc-400 text-lg">Points possible:</span>
                <span className="text-neutral-22 text-lg">
                  {puzzleDetails?.points ?? 100}
                </span>
              </p>
              {isWalletConnected && (
                <p className="flex justify-between">
                  <span className="text-zinc-400 text-lg">
                    Rewards possible:
                  </span>
                  <span className="text-neutral-22 text-lg">
                    {puzzleDetails?.rewardAmount.toFixed(2) ?? "0.00"}{" "}
                    {import.meta.env.VITE_ERC20_TOKEN_SYMBOL}
                  </span>
                </p>
              )}
            </section>
            {!forfeited && !lost && (
              <section className="flex flex-col gap-3 border-b border-neutral-14 pb-6 text-xs">
                <p className="flex justify-between">
                  <span className="text-zinc-400 text-lg">Mistakes made</span>
                  <span ref={mistakesRef} className="text-lg text-neutral-22">
                    0
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-zinc-400 text-lg">Guesses made</span>
                  <span ref={guessesRef} className="text-neutral-22 text-lg">
                    0
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-zinc-400 text-lg">Points earned:</span>
                  <span ref={pointsRef} className="text-neutral-22 text-lg">
                    0
                  </span>
                </p>
                {isWalletConnected && (
                  <p className="flex justify-between">
                    <span className="text-zinc-400 text-lg">
                      Rewards earned:
                    </span>
                    <span className="text-neutral-22 text-lg">
                      {puzzleDetails?.rewardAmount.toFixed(2)}{" "}
                      {import.meta.env.VITE_ERC20_TOKEN_SYMBOL}
                    </span>
                  </p>
                )}
              </section>
            )}
          </div>
          <div className="flex flex-row text-sm mt-10 gap-2">
            <button
              onClick={() => navigate(ROUTE_LEADERBOARD)}
              type="button"
              disabled={false}
              className="bg-almostblack text-neutral-22 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:border-gray-400 disabled:text-zinc-500 text-almostblack block mx-auto text-center relative border-neutral-22 border h-[3em] rounded-lg items-center font-bold font-second px-2 w-full"
            >
              View Results
            </button>
            {isWalletConnected && won && puzzleDetails?.rewardAmount && (
              <button
                onClick={() => rewardUser(puzzleDetails.rewardAmount)}
                type="button"
                disabled={!!transactionHash}
                className="bg-almostblack text-neutral-22 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:border-gray-400 disabled:text-zinc-500 text-almostblack block mx-auto text-center relative border-neutral-22 border h-[3em] rounded-lg items-center font-bold font-second px-2 w-full"
              >
                Claim rewards
              </button>
            )}
            <button
              onClick={() => {
                reset();
                setIsResetting(true);
              }}
              type="button"
              disabled={false}
              className="bg-primary-1 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:border-gray-400 disabled:text-zinc-500 text-almostblack block mx-auto text-center relative border-blackborder h-[3em] rounded-lg items-center font-bold font-second px-2 w-full"
            >
              {forfeited ? "Try different puzzle" : "Play again"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
