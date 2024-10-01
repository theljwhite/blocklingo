import { useGameStore } from "../store";
import { toastSuccess } from "../../components/UI/Toast/Toast";

//TODO - guess func can probably be cleaned up some

export function useGuessConnection() {
  const {
    connectionBoard,
    connectionGroup,
    connectionGuessGroup,
    userConnectionGuesses,
    correctGuesses,
    setUserIncorrectGuesses,
    setCorrectGuesses,
    setConnectionBoard,
    setUserConnectionGuesses,
    setConnectionGroup,
  } = useGameStore((state) => state);

  const shuffle = (): void => {
    const newOrder = connectionBoard.sort(() => Math.random() - 0.5);
    setConnectionBoard(newOrder);
  };

  const select = (userSelection: string): void => {
    const isAlreadySelected = userConnectionGuesses.includes(userSelection);

    if (isAlreadySelected) {
      const updatedGuesses = userConnectionGuesses.filter(
        (word) => word !== userSelection
      );
      const updatedBoard = connectionBoard.map((item) =>
        item.word === userSelection ? { ...item, selected: false } : item
      );

      setConnectionBoard(updatedBoard);
      setUserConnectionGuesses(updatedGuesses);
      return;
    }

    if (userConnectionGuesses.length < 4) {
      const updatedGuesses = [...userConnectionGuesses, userSelection];
      const updatedBoard = connectionBoard.map((item) =>
        item.word === userSelection ? { ...item, selected: true } : item
      );

      setConnectionBoard(updatedBoard);
      setUserConnectionGuesses(updatedGuesses);
    }
  };

  const deselectAll = (): void => {
    const updatedBoard = connectionBoard.map((item) => ({
      ...item,
      selected: false,
    }));
    setUserConnectionGuesses([]);
    setConnectionBoard(updatedBoard);
  };

  const guess = (): void => {
    const correctGroup = connectionGroup.find((groupWord) =>
      userConnectionGuesses.every((word) =>
        connectionGuessGroup[groupWord].includes(word)
      )
    );

    if (correctGroup) {
      toastSuccess(`Correct! You've found the ${correctGroup} group.`);

      const newGuessItem = {
        connectionGroupName: correctGroup,
        userConnectionGuesses: userConnectionGuesses,
      };
      const updatedCorrectGuesses = [...correctGuesses, newGuessItem];

      setCorrectGuesses(updatedCorrectGuesses);

      const remainingGroups = connectionGroup.filter(
        (groupWord) => groupWord !== correctGroup
      );

      const resetBoard = connectionBoard.filter(
        (item) => !userConnectionGuesses.includes(item.word)
      );

      setConnectionBoard(resetBoard);
      setConnectionGroup(remainingGroups);
      setUserConnectionGuesses([]);
    } else {
      setUserIncorrectGuesses(userConnectionGuesses);
      // toastError("Incorrect guess. Try again.", true);

      setUserConnectionGuesses([]);

      setTimeout(() => {
        setUserIncorrectGuesses([]);
      }, 2000);

      const resetBoard = connectionBoard.map((item) =>
        userConnectionGuesses.includes(item.word)
          ? { ...item, selected: false }
          : item
      );
      setConnectionBoard(resetBoard);
    }
  };

  return { shuffle, select, deselectAll, guess };
}
