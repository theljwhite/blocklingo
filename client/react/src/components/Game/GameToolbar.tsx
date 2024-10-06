import { useGameStore } from "../../game/store";
import { useGameAudio } from "../../game/store/AudioContext";
import { useSession } from "../../managers/auth/useSession";
import { UserTypeValue } from "../../managers/user-profile-manager";
import {
  ShuffleIcon,
  SoundIcon,
  BrainIcon,
  LightbulbIcon,
} from "../UI/Icons/game";
import { ShieldIconOne, ResetIcon } from "../UI/Icons";
import LightModeSwitch from "../UI/LightModeSwitch";

export default function GameToolbar() {
  const {
    isSoundOn,
    isLightMode,
    isAdminMode,
    setIsLightMode,
    setIsAdminMode,
    resetStep,
  } = useGameStore((state) => state);
  const { toggleSound } = useGameAudio();

  const { session } = useSession();
  const isUserAdmin = session?.user?.userTypeId === UserTypeValue.Admin;

  return (
    <div className="border-y border-neutral-21 bg-almostblack text-neutral-22">
      <div className="mx-auto px-6 max-w-screen-xl ">
        <div className="grow shrink m-3 flex flex-nowrap justify-between">
          <header className="w-full block">
            <section className="relative flex flex-row items-center justify-end h-6">
              <div className="flex flex-row items-center h-full text-neutral-22">
                {isUserAdmin && (
                  <button
                    onClick={() => setIsAdminMode(!isAdminMode)}
                    className={`${
                      isAdminMode ? "text-primary-1" : "text-neutral-22"
                    } border-none h-full flex px-2.5 bg-almostblack items-center text-lg`}
                  >
                    <ShieldIconOne size={24} />
                  </button>
                )}
                {isUserAdmin && (
                  <button
                    onClick={resetStep}
                    className="border-none h-full flex px-2.5 text-neutral-22 bg-almostblack items-center text-lg"
                  >
                    <ResetIcon size={24} />
                  </button>
                )}
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
                  onClick={toggleSound}
                  className="border-none h-full flex px-2.5 text-neutral-22 bg-almostblack items-center text-lg"
                >
                  <SoundIcon muted={!isSoundOn} size={26} />
                </button>
                <button
                  onClick={() => console.log("TODO")}
                  className="border-none flex items-center justify-center h-full flex px-2.5 text-neutral-22 bg-almostblack items-center text-lg"
                >
                  <LightModeSwitch
                    checked={isLightMode}
                    onChange={() => setIsLightMode(!isLightMode)}
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
