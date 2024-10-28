import { GameAudioProvider } from "../../game/store/AudioContext";
import GameStepper from "./GameStepper";
import ModalDialog from "../UI/ModalDialog";
import GameToolbarNew from "./GameToolbar";

export default function GameContainer() {
  return (
    <GameAudioProvider>
      <GameToolbarNew />
      <div className="grow shrink block overflow-x-hidden overflow-y-auto basis-[0%] min-h-[0px] font-second">
        <section className="bg-sleek-dark">
          <div className="relative bg-sleek-dark">
            <div
              style={{ background: "url('./tile_qt_2.png')" }}
              className="relative top-0 min-h-screen w-full bg-sleek-dark left-0 right-0 flex flex-col visible"
            >
              <div className="flex flex-col justify-center items-center">
                <article className="my-10">
                  <ModalDialog />
                  <GameStepper />
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
    </GameAudioProvider>
  );
}
