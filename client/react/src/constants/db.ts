export const API_BASE = "https://localhost:5001/api";

export const USER_PROFILE_BASE = `${API_BASE}/UserProfile`;
export const PUZZLE_BASE = `${API_BASE}/Puzzle`;
export const PUZZLE_ATTEMPT_BASE = `${API_BASE}/PuzzleAttempt`;
export const USER_ACHIEVEMENT_BASE = `${API_BASE}/UserAchievement`;

export const USER_PROFILE_BY_ID = (id: number) => `${USER_PROFILE_BASE}/${id}`;
export const USER_PROFILE_LOGIN = `${USER_PROFILE_BASE}/login`;
export const USER_PROFILE_BY_USERNAME = (username: string) =>
  `${USER_PROFILE_BASE}/username/${username}`;

export const PUZZLE_BY_ID = (id: number) => `${PUZZLE_BASE}/${id}`;
export const PUZZLE_DETAILS_BY_ID = (id: number) =>
  `${PUZZLE_BASE}/details/${id}`;
export const PUZZLE_WORDS_BY_ID = (id: number) => `${PUZZLE_BASE}/words/${id}`;
export const PUZZLE_BEST_AVAIL_BY_USER_ID = (userId: number) =>
  `${PUZZLE_BASE}/best/${userId}`;

export const PUZZLE_ATTEMPT_BY_ID = (id: number) =>
  `${PUZZLE_ATTEMPT_BASE}/${id}`;
export const PUZZLE_ATTEMPTS_BY_USER_ID = (userId: number) =>
  `${PUZZLE_ATTEMPT_BASE}/user/${userId}`;

export const PUZZLE_ATTEMPT_BY_USER_AND_PUZZLE = (
  puzzleId: number,
  userId: number
) => `${PUZZLE_ATTEMPT_BASE}/user/${userId}/puzzle/${puzzleId}`;

export const PUZZLE_ATTEMPT_SOLVE = (id: number) =>
  `${PUZZLE_ATTEMPT_BASE}/${id}/solve`;
export const PUZZLE_ATTEMPT_INCREMENT_TRIES = (id: number) =>
  `${PUZZLE_ATTEMPT_BASE}/${id}/increment`;

export const USER_ACHIEVEMENT_BY_ID = (id: number) =>
  `${USER_ACHIEVEMENT_BASE}/${id}`;
export const USER_ACHIEVEMENT_ALL_BY_USER_ID = (userId: number) =>
  `${USER_ACHIEVEMENT_BASE}/user/${userId}`;
