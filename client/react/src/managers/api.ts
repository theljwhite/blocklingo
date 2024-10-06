import { userManager } from "./user-profile-manager";
import { puzzleManager } from "./puzzle-manager";

export type ApiError = {
  error: string;
};

export const api = {
  users: userManager,
  puzzle: puzzleManager,
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
