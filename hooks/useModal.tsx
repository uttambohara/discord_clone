import { ExtendedServerProps } from "@/types";
import { create } from "zustand";

type ModalType =
  | "createServer"
  | "inviteFriends"
  | "serverSettings"
  | "manageMembers"
  | null;
type ModalData = ExtendedServerProps;

interface UseModal {
  isOpen: Boolean;
  openModal: ModalType;
  data?: ModalData;
  onOpen: (modalName: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<UseModal>((set) => ({
  isOpen: false,
  openModal: null,
  data: undefined,
  onOpen: (modalName, data = undefined) =>
    set({ isOpen: true, openModal: modalName, data }),
  onClose: () => set({ isOpen: false, openModal: null, data: undefined }),
}));
