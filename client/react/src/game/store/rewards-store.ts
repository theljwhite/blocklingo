import { create } from "zustand";

export type RewardLeaderboardEntry = {
  address: string;
  balance: number;
  puzzlesCompleted: number;
};

export type UserBalance = {
  value: bigint;
  formatted: string;
};

export interface RewardsStore {
  userBalance: UserBalance;
  balanceLoading: boolean;
  isBalanceChange: boolean;
  rewardLeaderboard: RewardLeaderboardEntry[];
  transactionHash: string;
  setUserBalance: (userBalance: UserBalance) => void;
  setIsBalanceChange: (isBalanceChange: boolean) => void;
  setRewardLeaderboard: (rewardLeaderboard: RewardLeaderboardEntry[]) => void;
  setBalanceLoading: (balanceLoading: boolean) => void;
  setTransactionHash: (transactionHash: string) => void;
}

export const useRewardsStore = create<RewardsStore>((set) => {
  const initialRewardsState = {
    userBalance: { value: 0n, formatted: "" },
    balanceLoading: false,
    isBalanceChange: false,
    rewardLeaderboard: [],
    transactionHash: "",
  };

  return {
    ...initialRewardsState,
    setUserBalance: (userBalance: UserBalance) => set({ userBalance }),
    setRewardLeaderboard: (rewardLeaderboard: RewardLeaderboardEntry[]) =>
      set({ rewardLeaderboard }),
    setIsBalanceChange: (isBalanceChange: boolean) => set({ isBalanceChange }),
    setBalanceLoading: (balanceLoading: boolean) => set({ balanceLoading }),
    setTransactionHash: (transactionHash: string) => set({ transactionHash }),
  };
});
