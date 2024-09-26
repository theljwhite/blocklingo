import { useSession } from "../../managers/auth/useSession";
import LayoutGameContainer from "../UI/Layouts/LayoutGameContainer";
import GameToolbar from "../Game/GameToolbar";
import GameBoard from "../Game/GameBoard";

//TODO

export default function Play() {
  const { session } = useSession();

  return (
    <LayoutGameContainer toolbar={<GameToolbar />}>
      <GameBoard />
    </LayoutGameContainer>
  );
}
