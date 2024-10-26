import { Link } from "react-router-dom";
import { useSession } from "../../managers/auth/useSession";
import { useAccount } from "wagmi";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import shortenEthereumAddress from "../../helpers/eth-utils";
import { ROUTE_PROFILE } from "../../constants/routes";
import { UserIcon } from "./Icons";

export default function NavbarSleek() {
  const { isConnected, address } = useAccount();
  const { session } = useSession();

  const { openAccountModal } = useAccountModal();
  const { openConnectModal } = useConnectModal();

  return (
    <div className="flex w-full bg-sleek-primary items-center justify-between px-6 max-h-16 grow shrink sticky left-0 right-0 h-full z-10 top-9">
      <div />
      <div className="inline-flex flex-row gap-4 justify-start items-center">
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
      </div>
    </div>
  );
}
