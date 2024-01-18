"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "@/components/modal/create-server-modal";
import InvitePeopleModal from "../modal/invite-people-modal";
import ServerSettingModal from "../modal/server-settings-modal";
import ManageMembersModal from "../modal/manage-members-modal";
import CreateChannelModal from "../modal/create-channel-modal";
import DeleteServerModal from "../modal/delete-server-modal";
import LeaveServerModal from "../modal/leave-server-modal";
import EditChannelModal from "../modal/edit-channel-modal";
import DeleteChannelModal from "../modal/delete-channel-modal";

export default function ModalProvider() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModal />
      <InvitePeopleModal />
      <ServerSettingModal />
      <ManageMembersModal />
      <CreateChannelModal />
      <DeleteServerModal />
      <LeaveServerModal />
      <EditChannelModal />
      <DeleteChannelModal />
    </>
  );
}
