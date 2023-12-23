import { create } from "zustand";

type ModalType = "createServer";

type ModalProps = {
  isOpen: boolean;
  currentModal: ModalType | null;
  onOpen: (value: ModalType) => void;
  onClose: () => void;
};

export const useModal = create<ModalProps>((set) => ({
  isOpen: false,
  currentModal: null,
  onOpen: (modal) => set({ isOpen: true, currentModal: modal }),
  onClose: () => set({ isOpen: false, currentModal: null }),
}));
