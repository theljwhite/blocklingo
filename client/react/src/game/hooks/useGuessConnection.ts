import { useGameStore } from "../store";
import { useGameAudio } from "../store/AudioContext";

export default function useGuessConnection() {
  const {
    connectionBoard,
    connectionGroup,
    connectionGuessGroup,
    userConnectionGuesses,
    correctGuesses,
    mistakes,
    setUserIncorrectGuesses,
    setCorrectGuesses,
    setConnectionBoard,
    setUserConnectionGuesses,
    setConnectionGroup,
    setMistakes,
    setConnectionsStatus,
  } = useGameStore((state) => state);
  const { play: playSound } = useGameAudio();

  const shuffle = (): void => {
    playSound("shuffle");
    const newOrder = connectionBoard.sort(() => Math.random() - 0.5);
    setConnectionBoard(newOrder);
  };

  const select = (userSelection: string): void => {
    const isAlreadySelected = userConnectionGuesses.includes(userSelection);

    if (isAlreadySelected) {
      playSound("unselect");
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
      playSound("select");
      const updatedGuesses = [...userConnectionGuesses, userSelection];
      const updatedBoard = connectionBoard.map((item) =>
        item.word === userSelection ? { ...item, selected: true } : item
      );

      setConnectionBoard(updatedBoard);
      setUserConnectionGuesses(updatedGuesses);
    }
  };

  const deselectAll = (): void => {
    playSound("deselect");
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
      playSound("success");

      const newGuessItem = {
        connectionGroupName: correctGroup,
        userConnectionGuesses: userConnectionGuesses,
      };

      const updatedBoard = connectionBoard.map((item) =>
        userConnectionGuesses.includes(item.word)
          ? { ...item, isAnimating: true }
          : item
      );

      setConnectionBoard(updatedBoard);

      setTimeout(() => {
        const updatedCorrectGuesses = [...correctGuesses, newGuessItem];

        setCorrectGuesses(updatedCorrectGuesses);

        const remainingGroups = connectionGroup.filter(
          (groupWord) => groupWord !== correctGroup
        );

        const resetBoard = connectionBoard.filter(
          (item) => !userConnectionGuesses.includes(item.word)
        );

        if (resetBoard.length === 0) {
          setConnectionsStatus("Won");
          playSound("win");
        }

        setConnectionBoard(resetBoard);
        setConnectionGroup(remainingGroups);
        setUserConnectionGuesses([]);

        playSound("sweep");
      }, 2000);
    } else {
      playSound("error_short");
      setUserIncorrectGuesses(userConnectionGuesses);
      setUserConnectionGuesses([]);

      setTimeout(() => {
        if (mistakes > 0) setMistakes(mistakes - 1);

        if (mistakes === 1) {
          setConnectionBoard([]);
          setConnectionsStatus("Lost");
          playSound("lost");
        }

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
