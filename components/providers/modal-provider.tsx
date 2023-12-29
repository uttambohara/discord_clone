"use client";

import { useEffect, useState } from "react";
import CreateChannelModal from "../modal/create-channel-modal";
import AddServerModal from "../modal/create-server-modal";
import DeleteServerModal from "../modal/delete-server-modal";
import InvitePeopleModal from "../modal/invite-friend-modal";
import LeaveServerModal from "../modal/leave-server-modal";
import ManageMembersModal from "../modal/manage-members-modal";

export default function ModalProvider() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(function () {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return (
    <>
      <AddServerModal />
      <InvitePeopleModal />
      <ManageMembersModal />
      <CreateChannelModal />
      <DeleteServerModal />
      <LeaveServerModal />
    </>
  );
}
