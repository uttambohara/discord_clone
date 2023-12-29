import { Server } from "@prisma/client";
import { create } from "zustand";

type ModalType =
  | "createServer"
  | "invitePeople"
  | "manageMembers"
  | "createChannel"
  | "deleteServer"
  | "leaveServer"
  | "";

type ModalData = Server | null;

interface UseModal {
  openModal: ModalType;
  isOpen: Boolean;
  data: ModalData;
  onOpen: (modal: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<UseModal>((set) => ({
  openModal: "",
  isOpen: false,
  data: null,
  onOpen: (modal, data) => set({ openModal: modal, isOpen: true, data }),
  onClose: () => set({ openModal: "", isOpen: false, data: null }),
}));
