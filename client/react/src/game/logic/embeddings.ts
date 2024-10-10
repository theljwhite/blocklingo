import {
  OPEN_AI_EMBEDDINGS,
  HUGGING_FACE_BASE,
} from "../../constants/external";
import { CONTEXT_WORST_SIMILARITY_SCORE } from "../data/constants";

//TODO - clean this up, better calculate score

export const getEmbeddings = async (word: string): Promise<number[] | null> => {
  const payload = {
    input: word,
    // model: "text-embedding-ada-002",
    // model: "text-embedding-3-small",
    model: "text-embedding-3-large",
  };

  try {
    const response = await fetch(OPEN_AI_EMBEDDINGS, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OAI_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error fetching embeddings: ${response.statusText}`);
    }

    const data = await response.json();

    return data.data[0].embedding;
  } catch (error) {
    console.error("Get embeddings error:", error);
    return null;
  }
};

export const getSimilaritiesDirect = async (
  targetWord: string,
  word: string
): Promise<number | null> => {
  const payload = {
    inputs: {
      source_sentence: targetWord,
      sentences: [word],
    },
  };
  try {
    const model = "sentence-transformers/all-MiniLM-L6-v2";
    const response = await fetch(`${HUGGING_FACE_BASE}/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_HF_SECRET}`,
        "Content-Type": "application/json",
        "x-wait-for-model": "true",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error fetching embedding: ${response.statusText}`);
    }

    const data = await response.json();

    return data[0];
  } catch (error) {
    console.error("Get similarities error:", error);
    return null;
  }
};

export const compareEmbeddingsGiveScore = (
  targetWordEmbed: number[],
  userGuessEmbed: number[]
): number => {
  const similarity = cosineSimilarity(targetWordEmbed, userGuessEmbed);

  return getScoreFromSimilarity(similarity);
};

export const getScoreFromSimilarity = (similarity: number): number => {
  let score = 0;

  if (similarity >= 0.99) {
    score = 1;
  } else if (similarity >= 0.6) {
    score = Math.floor((1 - similarity) * 100);
  } else if (similarity >= 0.4) {
    score = Math.floor((1 - similarity) * 5000);
  } else if (similarity >= 0.2) {
    score = Math.floor((1 - similarity) * 40000);
  } else {
    score = Math.floor((1 - similarity) * CONTEXT_WORST_SIMILARITY_SCORE);
  }

  return score;
};

export const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));

  if (magnitudeA * magnitudeB === 0) return 0;

  return dotProduct / (magnitudeA * magnitudeB);
};
