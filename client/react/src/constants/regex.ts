export const REGEX_EMAIL_ADDRESS =
  /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
export const SPACE_TO_CHAR_REPLACE = (str: string, joinBy: string) =>
  str.replace(/ /g, joinBy);
