import { ServerWithMembersProfile } from "@/types";
import { create } from "zustand";

type ModalType =
  | "createServer"
  | "invitePeople"
  | "serverSetting"
  | "manageMember"
  | "createChannel"
  | "deleteServer"
  | "leaveServer"
  | null;
type DataType = ServerWithMembersProfile;

interface UseModalT {
  isOpen: boolean;
  openModal: ModalType;
  server?: DataType;
  onOpen: (open: ModalType, server?: DataType) => void;
  onClose: () => void;
}

export const useModal = create<UseModalT>((set) => ({
  isOpen: false,
  openModal: null,
  server: undefined,
  onOpen: (openModal, server) => set({ isOpen: true, openModal, server }),
  onClose: () => set({ isOpen: false, openModal: null, server: undefined }),
}));
