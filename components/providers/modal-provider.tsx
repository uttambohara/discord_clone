"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "../modal/create-server-modal";

export default function ModalProvider() {
  // Prevent server side hydration
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(function () {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return (
    <>
      <CreateServerModal />
    </>
  );
}
