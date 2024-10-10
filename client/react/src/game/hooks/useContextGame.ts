import { useGameStore } from "../store";
import { useGameAudio } from "../store/AudioContext";
import {
  getEmbeddings,
  compareEmbeddingsGiveScore,
  getSimilaritiesDirect,
  getScoreFromSimilarity,
} from "../logic/embeddings";
import { WORD_STEM_REPLACE } from "../../constants/regex";
import { toastError } from "../../components/UI/Toast/Toast";

//TODO - all of these funcs wont be needed when a method of getting the similarities between words,
//is determined 100%

export default function useContextGame() {
  const {
    contextCurrentGuess,
    contextTargetWord,
    contextGuesses,
    contextTargetWordEmbeddings,
    setContextTargetWordEmbeddings,
    step,
    setContextGuesses,
    setContextCurrentGuess,
    setContextCurrentGuessObj,
    setIsLoading,
    setIsCalculating,
    setError,
  } = useGameStore((state) => state);

  const { play: playSound } = useGameAudio();

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

      //TODO
      console.log(`You won the game. Secret word: ${targetWord}`);
      // return;
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

  const getGuessSimilarityAndUpdate = async (): Promise<void> => {
    playSound("select");
    setIsCalculating(true);

    const userGuess = contextCurrentGuess.trim().toLowerCase();
    const targetWord = contextTargetWord.toLowerCase();

    if (userGuess === targetWord) {
      playSound("won");

      console.log(`You won the game. Secret word: ${contextTargetWord}`);
    }
    try {
      const cosineSimilarity = await getSimilaritiesDirect(
        targetWord,
        userGuess
      );

      console.log("SIMILARITY WAS:", cosineSimilarity);

      if (!cosineSimilarity) throw new Error();

      const similarityScore = getScoreFromSimilarity(cosineSimilarity);

      const newGuess = {
        word: userGuess,
        rankScore: similarityScore,
      };

      const updatedGuesses = [...contextGuesses, newGuess]
        .sort((a, b) => a.rankScore - b.rankScore)
        .map((guess) => ({ ...guess, selected: false }));

      setContextGuesses(updatedGuesses);
      setContextCurrentGuess("");
      setContextCurrentGuessObj(newGuess);

      setIsCalculating(false);
    } catch (error) {
      toastError("External API issue. Try your guess again.");
    }
  };

  const wordIsGuessed = (userGuess: string): boolean => {
    const stemmedGuess = WORD_STEM_REPLACE(userGuess.toLowerCase());

    const isAlreadyGuessed = contextGuesses.some(
      (guess) => WORD_STEM_REPLACE(guess.word.toLowerCase()) === stemmedGuess
    );

    if (isAlreadyGuessed) {
      const highlightedGuessedWord = contextGuesses.map((guess) =>
        WORD_STEM_REPLACE(guess.word.toLowerCase()) === stemmedGuess
          ? {
              ...guess,
              selected: true,
            }
          : guess
      );

      toastError("You already guessed this word.", true);
      setContextGuesses(highlightedGuessedWord);
    }

    return isAlreadyGuessed;
  };

  return {
    initContextGame,
    getGuessEmbeddingAndUpdate,
    wordIsGuessed,
    getGuessSimilarityAndUpdate,
  };
}
