"use client";

import { useEffect, useState } from "react";
import AddServerModal from "../modal/create-server-modal";
import InvitePeopleModal from "../modal/invite-friend-modal";

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
    </>
  );
}
