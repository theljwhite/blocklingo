import {
  USER_ACHIEVEMENT_BY_ID,
  USER_ACHIEVEMENT_ALL_BY_USER_ID,
} from "../constants/db";

export type UserAchievement = {
  id: number;
  userId: number;
  achievement: Achievement;
};

export type Achievement = {
  id: number;
  name: string;
  description: string;
  image: string | null;
  points: number | null;
  earnedAt: Date | null;
};

export const achievementManager = {
  getUserAchievementById: async (
    id: number
  ): Promise<UserAchievement | null> => {
    const response = await fetch(USER_ACHIEVEMENT_BY_ID(id));
    return await response.json();
  },
  getUserAchievementByUserId: async (
    userId: number
  ): Promise<Achievement[] | null> => {
    const response = await fetch(USER_ACHIEVEMENT_ALL_BY_USER_ID(userId));
    return await response.json();
  },
};
