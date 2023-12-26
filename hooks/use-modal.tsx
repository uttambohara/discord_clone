import { Server } from "@prisma/client";
import { create } from "zustand";

type ModalType = "createServer" | "inviteFriends" | "customizeServer";

type ModalData = Server | undefined;

type ModalProps = {
  isOpen: boolean;
  data: ModalData;
  currentModal: ModalType | null;
  onOpen: (value: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export const useModal = create<ModalProps>((set) => ({
  isOpen: false,
  data: undefined,
  currentModal: null,
  onOpen: (modal, data) => set({ isOpen: true, currentModal: modal, data }),
  onClose: () => set({ isOpen: false, currentModal: null }),
}));
