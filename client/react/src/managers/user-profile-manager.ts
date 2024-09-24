import {
  USER_PROFILE_BASE,
  USER_PROFILE_BY_ID,
  USER_PROFILE_LOGIN,
} from "../constants/db";
import { type ApiError, post } from "./api";

export type UserType = {
  id: number;
  name: string;
};

export enum UserTypeValue {
  Admin = 1,
  Player = 2,
}

export type User = {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  avatar: string | null;
  walletAddress: string | null;
  createdAt: Date;
  lastLoginDate: Date | null;
  userTypeId: number;
  userType: UserType;
};

export const userManager = {
  getAll: async () => {
    const response = await fetch(USER_PROFILE_BASE);
    return await response.json();
  },
  getById: async (id: number) => {
    const response = await fetch(USER_PROFILE_BY_ID(id));
    return await response.json();
  },
  login: async (email: string, password: string): Promise<User | ApiError> => {
    const response = await post<User>(USER_PROFILE_LOGIN, {
      email,
      password,
    });
    return response;
  },
  logout: (): void => {
    localStorage.clear();
  },
  register: async (user: Partial<User>): Promise<User | ApiError> => {
    const response = await post<User>(USER_PROFILE_BASE, user);
    return response;
  },
};
