import { Server } from "@prisma/client";
import { create } from "zustand";

type ModalType = "createServer" | "";
type ModalData = Server;

type UseModalProps = {
  isOpen: boolean;
  openModal: ModalType;
  data: ModalData | null;
  onOpen: (modal: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export const useModalStore = create<UseModalProps>((set) => ({
  isOpen: false,
  openModal: "",
  data: null,
  onOpen: (modal, data) => set({ isOpen: true, openModal: modal, data }),
  onClose: () => set({ isOpen: false, openModal: "", data: null }),
}));
