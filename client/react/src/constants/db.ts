export const API_BASE = "https://localhost:5001/api";

export const USER_PROFILE_BASE = `${API_BASE}/UserProfile`;
export const USER_PROFILE_BY_ID = (id: number) => `${USER_PROFILE_BASE}/${id}`;
export const USER_PROFILE_LOGIN = `${USER_PROFILE_BASE}/login`;

export const PUZZLE_BASE = `${API_BASE}/Puzzle`;
export const PUZZLE_BY_ID = (id: number) => `${PUZZLE_BASE}/${id}`;
export const PUZZLE_DETAILS_BY_ID = (id: number) =>
  `${PUZZLE_BASE}/${id}/details`;
export const PUZZLE_WORDS_BY_ID = (id: number) => `${PUZZLE_BASE}/${id}/words`;
