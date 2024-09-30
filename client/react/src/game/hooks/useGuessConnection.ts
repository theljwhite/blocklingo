import { useGameStore } from "../store";
import { toastError, toastSuccess } from "../../components/UI/Toast/Toast";

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

  const guess = (userGuess: string): void => {
    const isAlreadySelected = userConnectionGuesses.includes(userGuess);

    if (isAlreadySelected) {
      const updatedGuesses = userConnectionGuesses.filter(
        (word) => word !== userGuess
      );

      const updatedBoard = connectionBoard.map((item) =>
        item.word === userGuess ? { ...item, selected: false } : item
      );

      setConnectionBoard(updatedBoard);
      setUserConnectionGuesses(updatedGuesses);
      return;
    }

    const updatedGuesses = [...userConnectionGuesses, userGuess];
    const updatedBoard = connectionBoard.map((item) =>
      item.word === userGuess ? { ...item, selected: true } : item
    );

    if (updatedGuesses.length === 4) {
      const correctGroup = connectionGroup.find((groupWord) =>
        updatedGuesses.every((word) =>
          connectionGuessGroup[groupWord].includes(word)
        )
      );

      if (correctGroup) {
        toastSuccess(`Correct! You've found the ${correctGroup} group.`);

        const newGuessItem = {
          connectionGroupName: correctGroup,
          userConnectionGuesses: updatedGuesses,
        };
        const updatedCorrectGuesses = [...correctGuesses, newGuessItem];

        console.log("new correct guesses -->", updatedCorrectGuesses);

        setCorrectGuesses(updatedCorrectGuesses);

        const remainingGroups = connectionGroup.filter(
          (groupWord) => groupWord !== correctGroup
        );

        const resetBoard = connectionBoard.filter(
          (item) => !updatedGuesses.includes(item.word)
        );

        const answeredGroup = connectionGroup.filter((group) =>
          group.includes(userGuess)
        );

        console.log("CONNECTION GROUP -->", connectionGuessGroup);

        console.log("ANSWWE", answeredGroup);

        setConnectionBoard(resetBoard);
        setConnectionGroup(remainingGroups);
        setUserConnectionGuesses([]);
      } else {
        setUserIncorrectGuesses(updatedGuesses);
        // toastError("Incorrect guess. Try again.", true);

        setUserConnectionGuesses([]);

        setTimeout(() => {
          setUserIncorrectGuesses([]);
        }, 2000);

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
