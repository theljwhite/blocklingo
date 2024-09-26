import { useSession } from "../../managers/auth/useSession";
import LayoutGameContainer from "../UI/Layouts/LayoutGameContainer";
import GameToolbar from "../Game/GameToolbar";
import GameBoard from "../Game/GameBoard";

export default function GameContainer() {
  const { session } = useSession();

  return (
    <LayoutGameContainer toolbar={<GameToolbar />}>
      <GameBoard />
    </LayoutGameContainer>
  );
}
