import { useGameStore } from "../store";
import useDbPuzzle from "./useDbPuzzle";
import { triggerWords } from "../data/words/connections";
import { getTriggerWordsFromQuery } from "../logic/similar-words";
import { toastError } from "../../components/UI/Toast/Toast";

export default function useCreateConnection() {
  const {
    setIsLoading,
    setError,
    setConnectionBoard,
    setConnectionGroup,
    setConnectionGuessGroup,
  } = useGameStore((state) => state);

  const { getAndSetDbPuzzle } = useDbPuzzle();

  const shuffleArray = (arr: any[]): any[] => {
    return arr.sort(() => Math.random() - 0.5);
  };

  const createConnectionsBoard = async (
    usedIndices: Set<number>,
    wordLimit: number
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const availableIndices = triggerWords
        .map((_, index) => index)
        .filter((item) => !usedIndices.has(item));

      if (availableIndices.length === 0) {
        throw new Error("No more unused trigger words available");
      }

      const random = Math.floor(Math.random() * availableIndices.length);
      const randomIndex = availableIndices[random];

      usedIndices.add(randomIndex);

      const selectedWords = triggerWords[randomIndex];

      const relatedWordsPromises = selectedWords.map((word) =>
        getTriggerWordsFromQuery(word, wordLimit)
      );
      const relatedWordsResults = await Promise.all(relatedWordsPromises);

      const boardWords = relatedWordsResults
        .flatMap((wordsArr) => wordsArr?.slice(0, wordLimit - 1))
        .map((item) => ({ word: item?.word, selected: false }));

      const shuffledWords = shuffleArray(boardWords);

      const connectionGuessGroup = selectedWords.reduce((prev, curr, index) => {
        prev[curr] =
          relatedWordsResults[index]
            ?.slice(0, wordLimit - 1)
            .map((item) => item.word) ?? [];
        return prev;
      }, {} as Record<string, string[]>);

      setConnectionBoard(shuffledWords);
      setConnectionGroup(selectedWords);
      setConnectionGuessGroup(connectionGuessGroup);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(0, {
        step: 0,
        message: "Failed to create dynamic connections board.",
      });
      toastError("Failed to create connections board.", true);
    }
  };

  const createConnectionsBoardDb = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const dbPuzzle = await getAndSetDbPuzzle();

      if (!dbPuzzle) throw new Error();

      const connectionGroup = Object.keys(dbPuzzle.words);
      const boardWords = Object.values(dbPuzzle.words).flat();

      const shuffledWords = shuffleArray(
        boardWords.map((word) => ({ word, selected: false }))
      );

      setConnectionBoard(shuffledWords);
      setConnectionGroup(connectionGroup);
      setConnectionGuessGroup(dbPuzzle.words);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(0, { step: 0, message: "Failed to create connections board." });
      toastError("Failed to create connections board.", true);
    }
  };

  return { createConnectionsBoard, createConnectionsBoardDb };
}
