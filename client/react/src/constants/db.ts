export const API_BASE = "https://localhost:5001/api";

export const USER_PROFILE_BASE = `${API_BASE}/UserProfile`;
export const USER_PROFILE_BY_ID = (id: number) => `${USER_PROFILE_BASE}/${id}`;
export const USER_PROFILE_LOGIN = `${USER_PROFILE_BASE}/login`;
