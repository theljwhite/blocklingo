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
  reset: () => void;
}

export const useDialogModalStore = create<ModalState>((set) => {
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
    reset: () => set({ ...initialState }),
  };
});
