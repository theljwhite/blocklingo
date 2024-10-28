import { Link } from "react-router-dom";
import { useSession } from "../../managers/auth/useSession";
import shortenEthereumAddress from "../../helpers/eth-utils";
import {
  ROUTE_PLAY,
  ROUTE_LEADERBOARD,
  ROUTE_SETTINGS,
  ROUTE_HOW_TO_PLAY,
  ROUTE_EARNINGS,
  ROUTE_GOVERNANCE,
  ROUTE_PROFILE,
} from "../../constants/routes";
import {
  GearIconOne,
  HelpIconTwo,
  LeaderboardIconTwo,
  SvgProjectLogo,
  EthCircleColorIcon,
  AnalyticsIconTwo,
  GameControllerIcon,
  ThreeDots,
  GovernanceIcon,
  UserCircleIcon,
  SmartContractIcon,
} from "./Icons";


type SidebarListItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  image?: string;
  color?: string;
};

export default function SidebarSleek() {
  const { session } = useSession();

  const sidebarItems: SidebarListItem[] = [
    {
      title: "Play",
      path: ROUTE_PLAY,
      icon: <GameControllerIcon size={24} />,
    },
    {
      title: "Leaderboard",
      path: ROUTE_LEADERBOARD,
      icon: <LeaderboardIconTwo size={24} />,
    },
    {
      title: "How to play",
      path: ROUTE_HOW_TO_PLAY,
      icon: <HelpIconTwo size={24} />,
    },
    {
      title: "Player Earnings",
      path: ROUTE_EARNINGS,
      icon: <AnalyticsIconTwo size={22} />,
    },
    {
      title: "Governance",
      path: ROUTE_GOVERNANCE,
      icon: <GovernanceIcon size={24} />,
    },
    {
      title: "More",
      path: "TODO",
      icon: <ThreeDots size={24} />,
    },
  ];

  const userSidebarItems: SidebarListItem[] = [
    {
      title: "Settings",
      path: ROUTE_SETTINGS,
      icon: <GearIconOne size={24} />,
    },
    {
      title: "Profile",
      path: ROUTE_PROFILE(session.user?.username ?? ""),
      icon: <UserCircleIcon size={24} />,
    },
  ];

  const tokenSidebarItems: SidebarListItem[] = [
    {
      title: `$${import.meta.env.VITE_ERC20_TOKEN_SYMBOL} ERC20 token`,
      path: import.meta.env.VITE_ERC20_TOKEN_PATH,
      icon: <EthCircleColorIcon size={24} />,
      image: "/utility/eth_circle.png",
    },
    {
      title: `Game smart contract: ${shortenEthereumAddress(
        import.meta.env.VITE_GAME_SMART_CONTRACT_ADDRESS,
        4,
        4
      )}`,
      path: import.meta.env.VITE_GAME_SMART_CONTRACT_PATH,
      icon: <SmartContractIcon size={24} />,
      image: "/utility/polygon.svg",
    },
  ];

  return (
    <aside className="basis-[73px] relative z-10 min-h-[73px] min-w-[73px] w-[73px]">
      <div className="h-full -mt-[.1px] pt-[.1px]">
        <div className="h-full relative border-r border-sleek-secondary flex flex-col min-h-[0px] bg-sleek-primary">
          <section className="px-4 pt-6">
            <Link to="/" className="inline-block h-10 relative">
              <span className="h-10 w-10 block align-middle text-neutral-22">
                <SvgProjectLogo size={40} />
              </span>
            </Link>
          </section>
          <section className="pt-6 px-4 pb-2 overflow-y-auto basis-[0%] overflow-x-hidden relative grid gap-2 grow shrink">
            <ul className="flex flex-col gap-2">
              {sidebarItems.map((item, index) => {
                return (
                  <li key={index} className="inline-flex relative">
                    <div>
                      <Link
                        to={item.path}
                        className="flex grow shrink hover:bg-sleek-secondary items-center gap-2 relative p-2 min-w-10 rounded-lg overflow-hidden text-sleek-neutral"
                      >
                        <span className="min-w-6 min-h-6">{item.icon}</span>
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
          <div></div>
          <div className="pb-1 px-4">
            <section className="py-4">
              <ul className="justify-evenly flex flex-col gap-1">
                {tokenSidebarItems.map((item, index) => {
                  return (
                    <li key={index} className="inline-flex relative">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={item.path}
                        className="flex grow shrink items-center gap-2 relative p-2 min-w-10 rounded-lg overflow-hidden text-sleek-neutral"
                      >
                        <span className="min-w-6 min-h-6">{item.icon}</span>
                      </a>
                    </li>
                  );
                })}
                {userSidebarItems.map((item, index) => {
                  return (
                    <li key={index} className="inline-flex relative">
                      <Link
                        to={item.path}
                        className="flex grow shrink items-center gap-2 relative p-2 min-w-10 rounded-lg overflow-hidden text-sleek-neutral"
                      >
                        <span className="min-w-6 min-h-6">{item.icon}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </aside>
  );
}
