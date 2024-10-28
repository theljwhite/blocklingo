import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../managers/api";
import { type User } from "../../managers/user-profile-manager";
import { type Achievement } from "../../managers/achievement-manager";
import { type LeaderboardEntry } from "../../managers/leaderboard-manager";
import shortenEthereumAddress from "../../helpers/eth-utils";
import { copyTextToClipboard } from "../../helpers/copy-text";
import Popover from "../UI/Popover";
import { CopyTextIcon, InfoIcon, SvgProjectLogo } from "../UI/Icons";
import { LoadingSpinner } from "../UI/Spinners";

//TODO - fix media queries
//     - finish and implement tabs
//     - optimize db calls

const profileTabs = [
  {
    title: "Achievements",
    selected: true,
  },
  {
    title: "Earnings",
    selected: false,
  },
  {
    title: "Showcase",
    selected: false,
  },
];

export default function Profile() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Partial<User> | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboard, setLeaderboard] =
    useState<Partial<LeaderboardEntry | null>>(null);

  const [tabs, _] =
    useState<{ title: string; selected: boolean }[]>(profileTabs);

  const { username } = useParams();

  useEffect(() => {
    getSetProfile();
  }, [username]);

  const getSetProfile = async (): Promise<void> => {
    setIsLoading(true);
    const user = await api.users.getByUsername(username ?? "");
    const achievements = await api.achievements.getUserAchievementByUsername(
      username ?? ""
    );
    const leaderboardEntry = await api.leaderboard.getEntryByUserId(user.id);
    const achievementsByRecentDate = achievements?.sort(
      (a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime()
    );

    setProfile(user);
    setAchievements(achievementsByRecentDate ?? []);
    setLeaderboard(leaderboardEntry);

    setIsLoading(false);
  };

  return (
    <div className="grow shrink block overflow-x-hidden overflow-y-auto min-h-[0px] font-second">
      <div></div>
      <div className="max-w-[640px] w-full md:w-[768px] md:max-w-[768px] lg:w-[1024px] lg:max-w-[1024px] xl:max-w-[1320px] xl:w-[1320px] px-10 py-8 mx-auto flex flex-col gap-6">
        <div className="backdrop-blur-md bg-sleek-primary rounded-lg p-6 justify-between flex-wrap border border-zinc-700 gap-3 flex">
          <div className="grid gap-6 items-center min-w-[0px]">
            <div className="flex items-center gap-2">
              <div className="w-[88px] h-[88px] basis-[88px]">
                <div className="overflow-hidden rounded-full relative bg-transparent flex items-center justify-center w-full h-full scale-x-[-1]">
                  {profile?.avatar ? (
                    <img src={profile.avatar} />
                  ) : (
                    <img src="/utility/avatar-default.jpg" />
                  )}
                </div>
              </div>
              <div className="grid gap-1 justify-start min-w-[0px]">
                <h1 className="text-neutral-22 text-3xl tracking-tight font-semibold truncate overflow-hidden max-w-full justify-self-stretch">
                  {profile?.username}
                </h1>
                {profile?.walletAddress && (
                  <button
                    onClick={() =>
                      copyTextToClipboard(
                        profile?.walletAddress ?? "",
                        "Copied wallet address"
                      )
                    }
                    className="inline-block"
                  >
                    <div className="items-center px-4 py-1 bg-zinc-800 rounded-lg inline-flex justify-center">
                      <span className="text-gray-400">
                        <div className="flex flex-row gap-1 justify-center items-center cursor-pointer">
                          <div className="max-w-full text-sm truncate">
                            {shortenEthereumAddress(
                              profile?.walletAddress,
                              6,
                              6
                            )}
                          </div>
                          <CopyTextIcon size={12} />
                        </div>
                      </span>
                    </div>
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <div
                style={{
                  background:
                    "linear-gradient(270deg, rgba(174, 193, 197, 0) .07%, rgba(174, 193, 197, .19) 92.8%, rgba(174, 193, 197, .2) 99.14%)",
                }}
                className="inline-flex flex-wrap px-3 py-2 items-center gap-4 rounded-lg"
              >
                <div className="mr-4 inline-flex gap-2 flex-row items-center justify-start">
                  <span className="text-primary-1">
                    <SvgProjectLogo size={24} />
                  </span>
                  <div>
                    <div className="text-[10px] uppercase text-gray-400 font-bold">
                      {import.meta.env.VITE_ERC20_TOKEN_SYMBOL} Points
                    </div>
                    <div className="text-neutral-22 text-sm font-bold">
                      {leaderboard?.totalPoints ?? 0}
                    </div>
                  </div>
                </div>
                {achievements.slice(-4).map((achievement) => {
                  return (
                    <div key={achievement.id} className="inline-block">
                      <div>
                        <div className="w-10 h-10 flex items-center justify-center">
                          <img src={`/achieve/${achievement.image}`} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex gap-3" />
        </div>
        <div className="flex flex-col">
          <div className="flex relative border-b border-zinc-700">
            <div className="px-10 overflow-hidden relative whitespace-nowrap flex">
              <div className="flex relative">
                {tabs.map((tab, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        tab.selected ? "text-neutral-22" : "text-sleek-neutral"
                      } mr-2 px-4 py-2 items-center cursor-pointer flex text-sm relative outline-none`}
                    >
                      <div className="flex cursor-pointer">{tab.title}</div>
                    </div>
                  );
                })}
                {/* TODO: dynamic update of this bar */}
                <div className="absolute bottom-0 left-2 w-28 h-0.5 bg-primary-1" />
              </div>
            </div>
          </div>
          <div className="pt-2">
            <div className="flex w-full">
              <div className="w-full">
                <div className="pt-6 grid gap-8">
                  <section className="grid gap-5 p-6 bg-sleek-primary rounded-lg">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl tracking-tight text-neutral-22">
                        Achievements
                      </h2>
                      <span className="text-neutral-22 text-sm">
                        {achievements.length} total
                      </span>
                    </div>
                    <div
                      style={{
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(min(215px, 100%), 1fr))",
                      }}
                      className="grid gap-6 relative"
                    >
                      {achievements.map((achievement) => {
                        return (
                          <div
                            key={achievement.id}
                            className="relative grid p-6 rounded-lg bg-sleek-neutral2"
                          >
                            <div className="absolute top-3 group right-3 cursor-pointer text-neutral-22">
                              <InfoIcon size={20} />
                              <div className="relative">
                                <Popover message={achievement.description} />
                              </div>
                            </div>
                            <div className="justify-items-center grid gap-3">
                              <div className="w-20 h-20 flex justify-center items-center">
                                <img src={`/achieve/${achievement.image}`} />
                              </div>
                              <div className="grid justify-items-center">
                                <div className="text-sm font-semibold text-neutral-22">
                                  {achievement.name}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {new Date(
                                    achievement.earnedAt!
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
