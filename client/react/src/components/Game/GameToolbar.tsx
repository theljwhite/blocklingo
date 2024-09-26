import {
  ShuffleIcon,
  SoundIcon,
  BrainIcon,
  LightbulbIcon,
} from "../UI/Icons/game";
import LightModeSwitch from "../UI/LightModeSwitch";

export default function GameToolbar() {
  return (
    <div className="border-y border-neutral-21 text-neutral-22">
      <div className="mx-auto px-6 max-w-screen-xl ">
        <div className="grow shrink m-3 flex flex-nowrap justify-between">
          <header className="w-full block">
            <section className="relative flex flex-row items-center justify-end h-6">
              <div className="flex flex-row items-center h-full text-neutral-22">
                <button
                  onClick={() => console.log("TODO")}
                  className="border-none h-full flex px-2.5 text-neutral-22 bg-almostblack items-center text-lg"
                >
                  <ShuffleIcon size={26} />
                </button>
                <button
                  onClick={() => console.log("TODO")}
                  className="border-none h-full flex px-2.5 text-neutral-22 bg-almostblack items-center text-lg"
                >
                  <BrainIcon size={28} />
                </button>
                <button
                  onClick={() => console.log("TODO")}
                  className="border-none h-full flex px-2.5 text-neutral-22 bg-almostblack items-center text-lg"
                >
                  <LightbulbIcon size={24} />
                </button>
                <button
                  onClick={() => console.log("TODO")}
                  className="border-none h-full flex px-2.5 text-neutral-22 bg-almostblack items-center text-lg"
                >
                  <SoundIcon muted={true} size={26} />
                </button>
                <button
                  onClick={() => console.log("TODO")}
                  className="border-none flex items-center justify-center h-full flex px-2.5 text-neutral-22 bg-almostblack items-center text-lg"
                >
                  <LightModeSwitch
                    checked={false}
                    onChange={() => console.log("TODO")}
                  />
                </button>
              </div>
            </section>
          </header>
        </div>
      </div>
    </div>
  );
}
