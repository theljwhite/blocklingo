export const REGEX_EMAIL_ADDRESS =
  /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
export const SPACE_TO_CHAR_REPLACE = (str: string, joinBy: string) =>
  str.replace(/ /g, joinBy);

export const REGEX_ONLY_ALPHABET = /^[a-zA-Z]*$/;
export const WORD_STEM_REPLACE = (word: string) => {
  return word.replace(/(s|es|ing|ed)$/i, "");
};
