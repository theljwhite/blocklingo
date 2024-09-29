import {
  DATAMUSE_WORDS_MEANS_LIKE,
  DATAMUSE_WORDS_TRIGGER_WORDS,
} from "../../constants/external";
import { SPACE_TO_CHAR_REPLACE } from "../../constants/regex";

export type SimilarWordsResponseItem = {
  word: string;
  tags: string[];
  score: number;
};

export type TriggerWordResponseItem = {
  word: string;
  score: number;
};

export const getSimilarWordsFromQuery = async (
  query: string,
  limit: number
): Promise<SimilarWordsResponseItem[] | null> => {
  const queryPhraseWithPlus = SPACE_TO_CHAR_REPLACE(query, "+");

  try {
    const response = await fetch(
      `${DATAMUSE_WORDS_MEANS_LIKE}${queryPhraseWithPlus}&max=${limit}`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
};

export const getTriggerWordsFromQuery = async (
  query: string,
  limit: number
): Promise<TriggerWordResponseItem[] | null> => {
  const response = await fetch(
    `${DATAMUSE_WORDS_TRIGGER_WORDS}${query}&max=${limit}`
  );

  if (response.ok) return await response.json();

  return null;
};
