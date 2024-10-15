import { useEffect, useRef, useContext, createContext } from "react";
import { useGameStore } from "./index";

//NOTE: this useRef and ctx set up is used so that a new Audio object isnt created every time a sound,
//needs to be played. Especially those that could be played repetitively.

const GAME_AUDIO = {
  select: "./audio/select.wav",
  unselect: "./audio/unselect.wav",
  deselect: "./audio/deselect-all.wav",
  shuffle: "./audio/shuffle-two.mp3",
  shuffle_two: "./audio/shuffle.mp3",
  error: "./audio/error.mp3",
  error_short: "./audio/error-short.mp3",
  success: "./audio/correct1.mp3",
  sweep: "./audio/sweep-magic.wav",
  sweep_quiet: "./audio/sweep-one.wav",
  bell: "./audio/bell.wav",
  win: "./audio/win.mp3",
  lost: "./audio/lost-organ.mp3",
  win_long: "./audio/puzzle-win.mp3",
  loading: "./audio/loading.wav",
  cash: "./audio/cash.mp3",
};

const GameAudioContext = createContext<{
  play: (sound: string) => void;
  toggleSound: () => void;
} | null>(null);

export const GameAudioProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const { isSoundOn, setIsSoundOn } = useGameStore((state) => state);

  useEffect(() => {
    Object.keys(GAME_AUDIO).forEach((sound) => {
      audioRefs.current[sound] = new Audio(
        GAME_AUDIO[sound as keyof typeof GAME_AUDIO]
      );
    });
  }, []);

  const toggleSound = (): void => {
    setIsSoundOn(!isSoundOn);
  };

  const play = (sound: string): void => {
    if (!isSoundOn || !audioRefs.current[sound]) return;
    audioRefs.current[sound].currentTime = 0;
    audioRefs.current[sound].play();
  };

  return (
    <GameAudioContext.Provider value={{ play, toggleSound }}>
      {children}
    </GameAudioContext.Provider>
  );
};

export const useGameAudio = () => {
  const ctx = useContext(GameAudioContext);
  if (!ctx) {
    throw new Error("Missing GameAudioProvider wrapper");
  }
  return ctx;
};
