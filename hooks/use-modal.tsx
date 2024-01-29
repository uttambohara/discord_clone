import { ServerWithMembersWithChannels } from "@/types";
import { create } from "zustand";

type OpenModalType =
  | "createServer"
  | "invitePeople"
  | "serverSetting"
  | "createChannel"
  | "manageMembers"
  | "leaveServer"
  | "deleteServer"
  | ""
  | null
  | undefined;
interface ModalData {
  server?: ServerWithMembersWithChannels;
}

interface UseModalProps {
  isOpen: boolean;
  openModal: OpenModalType;
  data: ModalData;
  onOpen: (openModal: OpenModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<UseModalProps>((set) => ({
  isOpen: false,
  openModal: "",
  data: {},
  onOpen: (openModal, data) => set({ isOpen: true, openModal, data }),
  onClose: () => set({ isOpen: false, openModal: "", data: {} }),
}));
