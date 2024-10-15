import { create } from "zustand";

export type ModalType = "Default" | "Loading" | "Success" | "Error";

export type Modal = {
  type: ModalType;
  isOpen: boolean;
  title: string;
  message: string;
  isLoading: boolean;
  modalAction?: (...args: any[]) => any;
  modalSecondAction?: (...args: any[]) => any;
  outLink?: string;
  outLinkTitle?: string;
};

export interface ModalState {
  modal: Modal;
  setModal: (modal: Modal) => void;
  modalLoadingWithMessage: (title: string, message: string) => void;
  reset: () => void;
}

export const useDialogModalStore = create<ModalState>((set) => {
  const modalLoadingWithMessage = (title: string, message: string): void => {
    return set({
      modal: {
        type: "Loading",
        title,
        message,
        isOpen: true,
        isLoading: true,
        outLink: "",
      },
    });
  };

  const initialState = {
    modal: {
      type: "Loading" as ModalType,
      isOpen: false,
      title: "",
      message: "",
      isLoading: false,
      outLink: "",
    },
  };

  return {
    ...initialState,
    setModal: (modal: Modal) => set({ modal }),
    modalLoadingWithMessage,
    reset: () => set({ ...initialState }),
  };
});
