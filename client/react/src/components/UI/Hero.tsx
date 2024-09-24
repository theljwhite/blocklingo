import { useNavigate } from "react-router-dom";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useSession } from "../../managers/auth/useSession";
import {
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_PROFILE,
  ROUTE_PLAY,
} from "../../constants/routes";
import shortenEthereumAddress from "../../helpers/eth-utils";
import StyledButton from "./StyledButton";

export default function Hero() {
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  const { session } = useSession();
  const { username, id } = session?.user ?? {};

  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[calc(100vh - 55px)] block right-0 left-0">
      <div className="w-full text-almostblack min-h-[calc(100vh - 55px)] mt-40 mx-auto flex flex-col text-center">
        <div className="flex flex-col items-center justify-start flex-nowrap relative h-full px-2 py-4">
          <div className="max-w-full">
            <div
              className="h-24 mb-2 w-full block"
              style={{
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: "url(./temp_project_logo.png)",
              }}
            />
            <h1 className="text-4xl font-main font-bold">
              {import.meta.env.VITE_PROJECT_NAME}
            </h1>
            <p className="w-[200px] mx-auto my-[8px] font-second text-md">
              Play the game like this, all day baby
            </p>
            <span className="block mb-4" />
            <div className="mb-2">
              <StyledButton
                text="Play"
                type="button"
                disabled={false}
                onClick={() => navigate(ROUTE_PLAY)}
                isPrimary
              />
            </div>
            <div className="my-14">
              <p className="font-second text-sm font-semibold tracking-tight mb-3">
                Want to access all of our games?
              </p>
              <div className="flex flex-col gap-3 tracking-tight">
                <StyledButton
                  text={
                    isConnected && address
                      ? `Wallet: ${shortenEthereumAddress(address, 4, 4)}`
                      : "Connect wallet"
                  }
                  type="button"
                  disabled={false}
                  onClick={
                    isConnected && address
                      ? () => openAccountModal?.()
                      : () => openConnectModal?.()
                  }
                  isPrimary={false}
                />
                <StyledButton
                  text={username && id ? `Welcome, ${username}` : "Log in"}
                  type="button"
                  disabled={false}
                  onClick={
                    username && id
                      ? () => navigate(ROUTE_PROFILE(id))
                      : () => navigate(ROUTE_LOGIN)
                  }
                  isPrimary={false}
                />
                {!username && !id && (
                  <StyledButton
                    text="Register"
                    type="button"
                    disabled={false}
                    onClick={() => navigate(ROUTE_REGISTER)}
                    isPrimary={false}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-0.5 font-second">
              <span className="text-sm font-semibold">
                {new Date().toTimeString()}
              </span>
              <span className="text-xs">
                <span className="tracking-[0.01em] font-medium">Day No. 1</span>
              </span>
              <span className="tracking-[0.01em] text-xs font-medium">
                By{" "}
                <a
                  href="https://github.com/theljwhite"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline cursor-pointer"
                >
                  LJ White
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
