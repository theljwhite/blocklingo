import { toast } from "react-toastify";
import { type Id } from "react-toastify";
import ErrorToast from "./ErrorToast";
import SuccessToast from "./SuccessToast";
import LoadingToast from "./LoadingToast";

let toastId: Id | null = null;

const defaultSettings = {
  autoClose: 3000,
  icon: true,
  onClose: () => {
    toastId = null;
  },
};

const makeToast = (type: any, content: JSX.Element, moreSettings: any = {}) => {
  const settings = { ...defaultSettings, ...moreSettings, type };
  if (toastId) toast.dismiss(toastId);
  toastId = toast(content, settings);
};

export const dismissToast = () => {
  if (toastId) {
    toast.dismiss(toastId);
    toastId = null;
  }
};

export const toastError = (message: string, autoClose?: boolean) => {
  makeToast(toast.error, <ErrorToast message={message} />, {
    autoClose: !!autoClose,
  });
};

export const toastSuccess = (message: string, autoClose?: boolean) => {
  makeToast(toast.success, <SuccessToast message={message} />, {
    autoClose: !!autoClose,
  });
};

export const toastLoading = (
  message: string,
  autoClose?: boolean,
  showSignMessage?: boolean
) => {
  makeToast(
    toast.info,
    <LoadingToast message={message} showSignMessage={showSignMessage} />,
    { autoClose: !!autoClose }
  );
};
