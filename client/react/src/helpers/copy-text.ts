import { toastError, toastSuccess } from "../components/UI/Toast/Toast";

export const copyTextToClipboard = async (
  textToCopy: string,
  message: string
): Promise<void> => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    toastSuccess(message, true);
  } catch (error) {
    toastError("Could not copy text to clipboard");
  }
};
