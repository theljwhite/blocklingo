import {
  LEADERBOARD_ENTRY_BY_ID,
  LEADERBOARD_ENTRY_BY_USER_ID,
} from "../constants/db";

export type LeaderboardEntry = {
  id: number;
  totalPoints: number;
  totalSolvedPuzzles: number;
  rank: number;
  userId: number;
  lastSolvedPuzzleId: number;
  rankedAt: Date;
};

export const leaderboardManager = {
  getEntryById: async (id: number): Promise<LeaderboardEntry | null> => {
    const response = await fetch(LEADERBOARD_ENTRY_BY_ID(id));
    return await response.json();
  },
  getEntryByUserId: async (
    userId: number
  ): Promise<LeaderboardEntry | null> => {
    const response = await fetch(LEADERBOARD_ENTRY_BY_USER_ID(userId));
    return await response.json();
  },
};
