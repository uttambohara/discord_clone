"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "../modals/create-modal";
import InvitationModal from "../modals/invitation-modal";
import CustomizeServerModal from "../modals/customize-server-modal";

export default function ModalProvider() {
  const [mounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  if (!mounted) return null;
  return (
    <div>
      <CreateServerModal />
      <InvitationModal />
      <CustomizeServerModal />
    </div>
  );
}
