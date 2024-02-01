import { ServerWithMembersWithChannels } from "@/types";
import { ChannelType } from "@prisma/client";
import { create } from "zustand";

export type OpenModalType =
  | "createServer"
  | "invitePeople"
  | "serverSetting"
  | "createChannel"
  | "manageMembers"
  | "leaveServer"
  | "deleteServer"
  | "editChannel"
  | "deleteChannel"
  | "uploadFile"
  | "deleteChat"
  | ""
  | null
  | undefined;
interface ModalData {
  server?: ServerWithMembersWithChannels;
  channelData?: {
    channelId?: string;
    channelType?: ChannelType;
    channelName?: string;
    apiUrl?: string;
    params?: Record<string, string>;

    // Chat deletion
    socketUrl?: string;
    socketParams?: Record<string, string>;
    profileId?: string;
    postId?: string;
  };
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
