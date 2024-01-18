import { ServerWithMembersProfile } from "@/types";
import { create } from "zustand";
import { type ChannelType, Channel } from "@prisma/client";
import { channel } from "diagnostics_channel";

type ModalType =
  | "createServer"
  | "invitePeople"
  | "serverSetting"
  | "manageMember"
  | "createChannel"
  | "deleteServer"
  | "leaveServer"
  | "editChannel"
  | "deleteChannel"
  | null;
type DataType = ServerWithMembersProfile;

interface UseModalT {
  isOpen: boolean;
  openModal: ModalType;
  server?: DataType;
  channelType?: ChannelType;
  channel?: Channel;
  onOpen: (
    open: ModalType,
    server?: DataType,
    channelType?: ChannelType,
    channel?: Channel
  ) => void;
  onClose: () => void;
}

export const useModal = create<UseModalT>((set) => ({
  isOpen: false,
  openModal: null,
  server: undefined,
  channelType: undefined,
  channel: undefined,
  onOpen: (openModal, server, channelType, channel) =>
    set({ isOpen: true, openModal, server, channelType, channel }),
  onClose: () =>
    set({
      isOpen: false,
      openModal: null,
      server: undefined,
      channelType: undefined,
      channel: undefined,
    }),
}));
