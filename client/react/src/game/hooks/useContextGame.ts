import { useGameStore } from "../store";
import { useGameAudio } from "../store/AudioContext";
import useDbPuzzle from "./useDbPuzzle";
import {
  getEmbeddings,
  compareEmbeddingsGiveScore,
  getSimilaritiesDirect,
  getScoreFromSimilarity,
} from "../logic/embeddings";
import { WORD_STEM_REPLACE } from "../../constants/regex";
import {
  CONTEXT_INCORRECT_GUESSES_ALLOWED,
  GAME_END_ANIM_DELAY_MS,
} from "../data/constants";
import { toastError } from "../../components/UI/Toast/Toast";

//NOTE - these bottom 2 funcs are prob not needed anymore, but keeping just in case.

export default function useContextGame() {
  const {
    contextCurrentGuess,
    contextTargetWord,
    contextGuesses,
    contextTargetWordEmbeddings,
    setContextTargetWordEmbeddings,
    isAdminMode,
    step,
    setContextGuesses,
    setContextCurrentGuess,
    setContextCurrentGuessObj,
    setContextGameStatus,
    setIsLoading,
    setIsCalculating,
    setError,
  } = useGameStore((state) => state);

  const { play: playSound } = useGameAudio();
  const { createOrUpdateFailedPuzzleAttempt, updateSolvedPuzzleAttempt } =
    useDbPuzzle();

  const getGuessSimilarityAndUpdate = async (): Promise<void> => {
    playSound("loading");
    setIsCalculating(true);

    const userGuess = contextCurrentGuess.trim().toLowerCase();
    const targetWord = contextTargetWord.toLowerCase();

    try {
      const cosineSimilarity = await getSimilaritiesDirect(
        targetWord,
        userGuess
      );

      console.info("SIMILARITY WAS:", cosineSimilarity);

      if (!cosineSimilarity) throw new Error();

      const similarityScore = getScoreFromSimilarity(cosineSimilarity);

      const newGuess = {
        word: userGuess,
        rankScore: similarityScore,
        animate: userGuess === targetWord,
      };

      const updatedGuesses = [...contextGuesses, newGuess]
        .sort((a, b) => a.rankScore - b.rankScore)
        .map((guess) => ({
          ...guess,
          selected: guess.word.toLowerCase() === userGuess,
          animate: guess.word === targetWord,
        }));

      setContextGuesses(updatedGuesses);
      setContextCurrentGuess("");
      setContextCurrentGuessObj(newGuess);

      setIsCalculating(false);
      playSound("select");

      handleGameStatusChange(userGuess, targetWord);
    } catch (error) {
      playSound("error_short");
      setIsCalculating(false);
      toastError("External API issue. Try your guess again.");
    }
  };

  const isWordGuessed = (userGuess: string): boolean => {
    const stemmedGuess = WORD_STEM_REPLACE(userGuess.toLowerCase());

    const isAlreadyGuessed = contextGuesses.some(
      (guess) => WORD_STEM_REPLACE(guess.word.toLowerCase()) === stemmedGuess
    );

    if (isAlreadyGuessed) {
      const highlightedGuessedWord = contextGuesses.map((guess) => ({
        ...guess,
        selected: WORD_STEM_REPLACE(guess.word.toLowerCase()) === stemmedGuess,
      }));

      playSound("error_short");
      toastError("You already guessed this word.", true);
      setContextGuesses(highlightedGuessedWord);
    }

    return isAlreadyGuessed;
  };

  const handleGameStatusChange = async (
    userGuess: string,
    targetWord: string
  ): Promise<void> => {
    if (userGuess === targetWord) {
      playSound("success");
      playSound("score_bar");
      await updateSolvedPuzzleAttempt();

      setTimeout(() => {
        playSound("win_long");
        setContextGameStatus("Won");
      }, GAME_END_ANIM_DELAY_MS);
    }

    if (
      !isAdminMode &&
      contextGuesses.length >= CONTEXT_INCORRECT_GUESSES_ALLOWED
    ) {
      playSound("lost");
      setContextGameStatus("Lost");
      await createOrUpdateFailedPuzzleAttempt();
    }
  };

  const initContextGame = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const embeddings = await getEmbeddings(contextTargetWord);
      if (!embeddings) throw new Error();

      setContextTargetWordEmbeddings(embeddings);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(step, {
        step,
        message: "There was an External API issue when building game.",
      });
      toastError("External API issue building game. Try again later.");
    }
  };

  const getGuessEmbeddingAndUpdate = async (): Promise<void> => {
    playSound("select");

    const userGuess = contextCurrentGuess.trim().toLowerCase();
    const targetWord = contextTargetWord.toLowerCase();

    if (userGuess === targetWord) {
      playSound("won");
    }

    setIsCalculating(true);
    try {
      const guessEmbeddings = await getEmbeddings(userGuess);

      if (!guessEmbeddings) throw new Error();

      const similarityScore = compareEmbeddingsGiveScore(
        contextTargetWordEmbeddings,
        guessEmbeddings
      );

      const newGuess = {
        word: userGuess,
        rankScore: similarityScore,
      };

      const updatedGuesses = [...contextGuesses, newGuess].sort(
        (a, b) => a.rankScore - b.rankScore
      );

      setContextGuesses(updatedGuesses);
      setContextCurrentGuess("");
      setContextCurrentGuessObj(newGuess);

      setIsCalculating(false);
    } catch (error) {
      toastError("External API issue building game. Try again later.");
    }
  };

  return {
    initContextGame,
    getGuessEmbeddingAndUpdate,
    isWordGuessed,
    getGuessSimilarityAndUpdate,
  };
}
