import { Server } from "@prisma/client";
import { create } from "zustand";

type ModalType = "createServer" | "";
type ModalData = Server | null;

interface UseModalStore {
  openModal: ModalType;
  isOpen: boolean;
  data: ModalData;
  onOpen: (modal: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<UseModalStore>((set) => ({
  openModal: "",
  isOpen: false,
  data: null,
  onOpen: (modal, data) => set({ openModal: modal, isOpen: true, data }),
  onClose: () => set({ openModal: "", isOpen: false, data: null }),
}));
