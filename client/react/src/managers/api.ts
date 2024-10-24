import { userManager } from "./user-profile-manager";
import { puzzleManager } from "./puzzle-manager";
import { puzzleAttemptManager } from "./puzzle-attempt-manager";
import { achievementManager } from "./achievement-manager";

export type ApiError = {
  error: string;
};

export const api = {
  users: userManager,
  puzzle: puzzleManager,
  puzzleAttempt: puzzleAttemptManager,
  achievements: achievementManager,
};

const defaultPostHeaders = { "Content-Type": "application/json" };

export const post = async <T extends Record<string, unknown>>(
  url: string,
  body: Record<string, unknown>,
  extraHeaders?: Record<string, string>
): Promise<T | ApiError> => {
  const response = await fetch(url, {
    method: "POST",
    headers: extraHeaders
      ? {
          ...defaultPostHeaders,
          ...extraHeaders,
        }
      : defaultPostHeaders,
    body: JSON.stringify(body),
  });

  const json = await response.json();

  if (!response.ok || "message" in json) return { error: json.message };

  return json;
};
