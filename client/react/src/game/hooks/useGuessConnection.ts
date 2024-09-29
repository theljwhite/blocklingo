import { useEffect } from "react";
import { useGameStore } from "../store";
import { toastError, toastSuccess } from "../../components/UI/Toast/Toast";

export function useGuessConnection() {
  const {
    connectionBoard,
    connectionGroup,
    connectionGuessGroup,
    userConnectionGuesses,
    setConnectionBoard,
    setUserConnectionGuesses,
    setConnectionGroup,
  } = useGameStore((state) => state);

  const resetBoardAfterConnection = (): void => {
    const resetBoard = connectionBoard.map((item) =>
      userConnectionGuesses.includes(item.word)
        ? { ...item, selected: false }
        : item
    );
    setConnectionBoard(resetBoard);
  };

  const guess = (userGuess: string): void => {
    // Check if the word is already selected
    const isAlreadySelected = userConnectionGuesses.includes(userGuess);

    if (isAlreadySelected) {
      const updatedGuesses = userConnectionGuesses.filter(
        (word) => word !== userGuess
      );

      const updatedBoard = connectionBoard.map((item) =>
        item.word === userGuess ? { ...item, selected: false } : item
      );

      console.log("updated guesses already SEL-->", updatedGuesses);

      setConnectionBoard(updatedBoard);
      setUserConnectionGuesses(updatedGuesses);
      return;
    }

    const updatedGuesses = [...userConnectionGuesses, userGuess];

    console.log("updated guesses not SEL -->", updatedGuesses);
    const updatedBoard = connectionBoard.map((item) =>
      item.word === userGuess ? { ...item, selected: true } : item
    );

    if (updatedGuesses.length === 4) {
      const matchedGroup = connectionGroup.find((groupWord) =>
        updatedGuesses.every((word) =>
          connectionGuessGroup[groupWord].includes(word)
        )
      );

      if (matchedGroup) {
        toastSuccess(`Correct! You've found the ${matchedGroup} group.`);

        const remainingGroups = connectionGroup.filter(
          (groupWord) => groupWord !== matchedGroup
        );
        setConnectionGroup(remainingGroups);

        setUserConnectionGuesses([]);
      } else {
        toastError("Incorrect guess. Try again.");
        setUserConnectionGuesses([]);

        const resetBoard = connectionBoard.map((item) =>
          updatedGuesses.includes(item.word)
            ? { ...item, selected: false }
            : item
        );
        setConnectionBoard(resetBoard);
      }
    } else {
      setConnectionBoard(updatedBoard);
      setUserConnectionGuesses(updatedGuesses);
    }
  };

  return { guess };
}
