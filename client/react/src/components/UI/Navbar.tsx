import { useState } from "react";
import { Link } from "react-router-dom";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { useSession } from "../../managers/auth/useSession";
import { useAccount } from "wagmi";
import shortenEthereumAddress from "../../helpers/eth-utils";
import Sidebar from "./Sidebar";
import {
  MenuIcon,
  LeaderboardIconOne,
  GearIconOne,
  HelpIconOne,
  UserIcon,
} from "./Icons";
import {
  ROUTE_HOW_TO_PLAY,
  ROUTE_LEADERBOARD,
  ROUTE_SETTINGS,
  ROUTE_PROFILE,
} from "../../constants/routes";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  const { session } = useSession();

  return (
    <>
      <div>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <div className="w-full block bg-almostblack z-[10]">
        <header className="w-full block">
          <section className="justify-between relative flex flex-row items-center lg:h-14 h-12 border border-b border-neutral-21 px-4">
            <div className="flex flex-row items-center h-full">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="border-none h-full flex px-2.5 text-neutral-22 bg-almostblack items-center text-lg"
              >
                <MenuIcon size={26} />
              </button>
            </div>
            <h1 className="invisible"></h1>
            <menu className="flex items-center h-full">
              <Link
                to={ROUTE_LEADERBOARD}
                className="text-neutral-22 px-2.5 items-center flex border-none h-full text-lg"
              >
                <LeaderboardIconOne size={30} />
              </Link>
              <Link
                to={ROUTE_SETTINGS}
                className="text-neutral-22 px-2.5 items-center flex border-none h-full text-lg"
              >
                <GearIconOne size={30} />
              </Link>
              <Link
                to={ROUTE_HOW_TO_PLAY}
                className="text-neutral-22 px-2.5 items-center flex border-none h-full text-lg"
              >
                <HelpIconOne size={30} />
              </Link>
              <div className="ml-2 flex flex-row gap-2 font-second">
                {session?.user?.id && (
                  <Link
                    to={ROUTE_PROFILE(session.user.username)}
                    className="flex items-center gap-2 justify-center text-primary-1 font-normal tracking-tight text-sm lg:text-base border border-primary-1 rounded-lg px-4 h-8 lg:h-11"
                  >
                    <UserIcon size={18} />
                    {session?.user?.username}
                  </Link>
                )}
                <button
                  type="button"
                  onClick={
                    isConnected && address
                      ? () => openAccountModal?.()
                      : () => openConnectModal?.()
                  }
                  className="flex items-center justify-center text-neutral-22 font-normal tracking-tight text-sm lg:text-base border border-neutral-22 rounded-full px-4 h-8 lg:h-11"
                >
                  {isConnected && address
                    ? `Wallet: ${shortenEthereumAddress(address, 4, 4)}`
                    : "Connect wallet"}
                </button>
              </div>
            </menu>
          </section>
        </header>
      </div>
    </>
  );
}
