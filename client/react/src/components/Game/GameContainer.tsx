import LayoutGameContainer from "../UI/Layouts/LayoutGameContainer";
import { GameAudioProvider } from "../../game/store/AudioContext";
import GameToolbar from "../Game/GameToolbar";
import GameStepper from "./GameStepper";
import ModalDialog from "../UI/ModalDialog";

export default function GameContainer() {
  return (
    <GameAudioProvider>
      <LayoutGameContainer toolbar={<GameToolbar />}>
        <ModalDialog />
        <GameStepper />
      </LayoutGameContainer>
    </GameAudioProvider>
  );
}
