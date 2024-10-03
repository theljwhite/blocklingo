import { useSession } from "../../managers/auth/useSession";
import LayoutGameContainer from "../UI/Layouts/LayoutGameContainer";
import { GameAudioProvider } from "../../game/store/AudioContext";
import GameToolbar from "../Game/GameToolbar";
import GameStepper from "./GameStepper";

export default function GameContainer() {
  const { session } = useSession();

  return (
    <GameAudioProvider>
      <LayoutGameContainer toolbar={<GameToolbar />}>
        <GameStepper />
      </LayoutGameContainer>
    </GameAudioProvider>
  );
}
