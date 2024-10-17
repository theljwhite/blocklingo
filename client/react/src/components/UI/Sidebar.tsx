import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSession } from "../../managers/auth/useSession";
import { useAccount } from "wagmi";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useOnClickOutside } from "../../helpers/window-events";
import shortenEthereumAddress from "../../helpers/eth-utils";
import {
  ROUTE_LEADERBOARD,
  ROUTE_SETTINGS,
  ROUTE_HOW_TO_PLAY,
  ROUTE_EARNINGS,
  ROUTE_PRIVACY_POLICY,
  ROUTE_LOGIN,
} from "../../constants/routes";
import StyledSquareButton from "./StyledSquareButton";
import {
  CloseXOne,
  GearIconOne,
  HelpIconOne,
  LeaderboardIconOne,
  SvgProjectLogo,
  EthCircleIcon,
  AnalyticsIconOne,
} from "./Icons";

//TODO - sidebar close on route nav link click
//TODO - can get rid of the useEffect here and use framer motion to animate

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type SidebarGroup = {
  sectionName: string;
  items: SidebarListItem[];
};

type SidebarListItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  image?: string;
  color?: string;
};

const sidebarGroup: SidebarGroup[] = [
  {
    sectionName: "Navigate",
    items: [
      {
        title: "Leaderboard",
        path: ROUTE_LEADERBOARD,
        icon: <LeaderboardIconOne size={20} />,
      },
      {
        title: "Settings",
        path: ROUTE_SETTINGS,
        icon: <GearIconOne size={20} />,
      },
      {
        title: "How to play",
        path: ROUTE_HOW_TO_PLAY,
        icon: <HelpIconOne size={20} />,
      },
    ],
  },
];

const tokenItems: SidebarListItem[] = [
  {
    title: "Player Earnings",
    path: ROUTE_EARNINGS,
    icon: <AnalyticsIconOne size={20} />,
  },
  {
    title: `$${import.meta.env.VITE_ERC20_TOKEN_SYMBOL} ERC20 token`,
    path: import.meta.env.VITE_ERC20_TOKEN_PATH,
    icon: <EthCircleIcon size="20" />,
  },
  {
    title: `Game smart contract: ${shortenEthereumAddress(
      import.meta.env.VITE_GAME_SMART_CONTRACT_ADDRESS,
      4,
      4
    )}`,
    path: import.meta.env.VITE_GAME_SMART_CONTRACT_PATH,
    image: "url('./utility/polygon.svg')",
  },
];

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const [show, setShow] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const { session, dispatch } = useSession();
  const navigate = useNavigate();

  const { isConnected, address } = useAccount();
  const { openAccountModal } = useAccountModal();
  const { openConnectModal } = useConnectModal();

  useOnClickOutside(sidebarRef, () => setIsSidebarOpen(false));

  useEffect(() => {
    if (isSidebarOpen) setShow(true);
    else {
      const timeout = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isSidebarOpen]);

  const closeSidebarOpenCryptoModal = (): void => {
    setIsSidebarOpen(false);
    if (isConnected && address) openAccountModal?.();
    else openConnectModal?.();
  };

  const closeSidebarNavRoute = (route: string): void => {
    setIsSidebarOpen(false);
    navigate(route);
  };

  return (
    <section
      className={`${
        show ? "" : "pointer-events-none"
      } flex flex-col justify-left absolute h-full w-full top-0 left-0 z-[1000]`}
    >
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-[100px]"
        } transition-all duration-200 relative w-[375px] bg-almostblack border-t border-neutral-24 overflow-y-auto [box-shadow:3px_5px_5px_rgba(0,0,0,.15)] max-w-[500px] border-box h-dvh`}
      >
        <div className="flex items-center relative border-b border-neutral-23 h-14 text-almostblack">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="px-3 mr-12 w-6 h-6 text-neutral-22 border-none bg-transparent overflow-visible scale-[1.3]"
          >
            <CloseXOne size={16} />
          </button>
          <div className="top-0 relative left-auto right-auto scale-[1.3] text-center text-almostblack">
            <button
              type="button"
              onClick={() => closeSidebarNavRoute("/")}
              className="text-neutral-22 flex gap-1 flex-row justify-center items-center font-main"
            >
              <SvgProjectLogo size={18} />
              <hr className="border-l border-neutral-14 h-4" />
              {import.meta.env.VITE_PROJECT_NAME}
            </button>
          </div>
        </div>
        <nav className="[box-shadow:0px_0px_7px_-1px_rgba(0,0,0,.45)] flex flex-col overflow-y-auto">
          {sidebarGroup.map((group, index) => {
            return (
              <div key={index}>
                <h3
                  key={index}
                  className="font-second text-xs uppercase font-bold my-3 text-neutral-22 pl-4"
                >
                  {group.sectionName}
                </h3>

                <div className="list-none">
                  <ul>
                    {group.items.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link className="block" to={item.path}>
                            <div className="flex justify-start items-start text-neutral-22 font-second text-base px-4 py-2 hover:bg-neutral-25">
                              {item.image ? (
                                <span
                                  style={{
                                    backgroundImage: item.image ?? "",
                                    backgroundSize: "20px",
                                    backgroundRepeat: "no-repeat",
                                  }}
                                  className="h-5 w-7 pr-2 pb-0.5 align-middle inline-block"
                                />
                              ) : (
                                <span className="h-5 w-7 pr-2 pb-0.5 align-middle inline-block">
                                  {item.icon}
                                </span>
                              )}
                              <div className="max-w-[280px] text-base self-center">
                                {item.title}
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
          <div className="mt-2">
            <hr className="border-t border-neutral-26 w-[calc(100% - 36px)] mb-2 ms-5 me-5" />
            <ul className="list-none">
              {tokenItems.map((item, index) => {
                return (
                  <li key={index}>
                    <a
                      className="block"
                      href={item.path}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="flex justify-start items-start text-neutral-22 font-second text-base px-4 py-2 hover:bg-neutral-25">
                        {item.image ? (
                          <span
                            style={{
                              backgroundImage: item.image ?? "",
                              backgroundSize: "20px",
                              backgroundRepeat: "no-repeat",
                            }}
                            className="h-5 w-7 pr-2 pb-0.5 align-middle inline-block"
                          />
                        ) : (
                          <span className="h-5 w-7 pr-2 pb-0.5 align-middle inline-block">
                            {item.icon}
                          </span>
                        )}
                        <div className="max-w-[280px] text-base self-center">
                          {item.title}
                        </div>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-2">
            <hr className="border-t border-neutral-26 w-[calc(100% - 36px)] mb-2 ms-5 me-5" />
            <Link
              to={ROUTE_PRIVACY_POLICY}
              className="h-10 flex text-xs font-second justify-start items-center p-5 underline text-neutral-22"
            >
              Privacy policy
            </Link>
          </div>
        </nav>
        <div className="border-t border-black w-full bottom-0 sticky mt-[3px] bg-neutral-27">
          <div className="flex flex-row items-center gap-2 justify-evenly mt-2 flex-nowrap p-2">
            <StyledSquareButton
              type="button"
              text={isConnected && address ? "Disconnect" : "Connect"}
              onClick={closeSidebarOpenCryptoModal}
              disabled={false}
              bgClass="bg-black"
              textClass="text-white"
              borderColorClass="border-white"
            />
            <StyledSquareButton
              type="button"
              text={session?.user?.id ? "Logout" : "Log in"}
              onClick={
                session?.user?.id
                  ? () => dispatch({ type: "logout" })
                  : () => closeSidebarNavRoute(ROUTE_LOGIN)
              }
              disabled={false}
              bgClass="bg-neutral-27"
              textClass="text-neutral-22"
              borderColorClass="border-neutral-22"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
