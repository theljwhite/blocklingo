import { useEffect } from "react";
import { useGameStore } from "../../game/store";
import { useGameAudio } from "../../game/store/AudioContext";
import { useSession } from "../../managers/auth/useSession";
import { useAccount } from "wagmi";
import useRewards from "../../game/hooks/useRewards";
import { useRewardsStore } from "../../game/store/rewards-store";
import { UserTypeValue } from "../../managers/user-profile-manager";
import LightModeSwitch from "../UI/LightModeSwitch";
import { LoadingSpinner } from "../UI/Spinners";
import {
  ShuffleIcon,
  SoundIcon,
  BrainIcon,
  LightbulbIcon,
} from "../UI/Icons/game";
import {
  ShieldIconOne,
  ResetIcon,
  NetworkIcon,
  CoinsOne,
  SvgProjectLogo,
} from "../UI/Icons";

export default function GameToolbar() {
  const {
    puzzleDetails,
    step,
    isSoundOn,
    isLightMode,
    isAdminMode,
    setIsLightMode,
    setIsAdminMode,
    resetStep,
  } = useGameStore((state) => state);
  const { toggleSound } = useGameAudio();

  const { userBalance, balanceLoading } = useRewardsStore((state) => state);
  const { isConnected, address, chain } = useAccount();
  const { getAndSetUserBalance } = useRewards();

  const { session } = useSession();
  const isUserAdmin = session?.user?.userTypeId === UserTypeValue.Admin;

  useEffect(() => {
    if (isConnected && address) getAndSetUserBalance();
  }, [address, isConnected]);

  return (
    <div className="border-y border-neutral-21 bg-almostblack font-second text-neutral-22">
      <div className="mx-auto max-w-screen-xl ">
        <div className="grow shrink m-3 flex flex-nowrap justify-between">
          <header className="w-full block">
            <section className="relative flex flex-row items-center justify-between h-6">
              <div className="flex flex-row items-center h-full text-neutral-22">
                <span className="text-neutral-22 border-none h-full flex-row gap-2 text-sm flex px-2.5 bg-almostblack items-center text-lg">
                  <NetworkIcon size={20} />
                  {chain?.name ?? "No wallet connected"}
                </span>
                {isConnected && address && (
                  <>
                    {balanceLoading ? (
                      <span className="text-neutral-22 border-none h-full flex-row gap-2 text-sm flex px-2.5 bg-almostblack items-center text-lg">
                        <CoinsOne size={20} />
                        Balance: <LoadingSpinner size={16} />
                      </span>
                    ) : (
                      userBalance.formatted && (
                        <span className="text-neutral-22 border-none h-full flex-row gap-2 text-sm flex px-2.5 bg-almostblack items-center text-lg">
                          <CoinsOne size={20} />
                          Balance: {Number(userBalance.formatted).toFixed(2)} $
                          {import.meta.env.VITE_ERC20_TOKEN_SYMBOL}
                        </span>
                      )
                    )}
                  </>
                )}
                {puzzleDetails && (
                  <span className="text-neutral-22 border-none h-full flex-row gap-2 text-sm flex px-2.5 bg-almostblack items-center text-lg">
                    <SvgProjectLogo size={22} />
                    Playing Puzzle #{puzzleDetails.id} - Stage {step + 1} (
                    {puzzleDetails.difficulty} difficulty)
                  </span>
                )}
              </div>
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
