"use client";

import CreateServerDialog from "@/components/modal/create-server-dialog";
import InviteFriendsModal from "@/components/modal/invite-friends-modal";
import ServerSettingModal from "@/components/modal/server-setting-modal";
import { useEffect, useState } from "react";

export default function ModalProvider() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);
  if (!hasMounted) return null;

  return (
    <>
      <CreateServerDialog />
      <InviteFriendsModal />
      <ServerSettingModal />
    </>
  );
}
