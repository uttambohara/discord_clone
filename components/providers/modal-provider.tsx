"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "../modals/create-server-modal";

export default function ModalProvider() {
  const [hasMounted, setHasMounted] = useState(false);
  //  Prevent hydraiton error
  useEffect(() => setHasMounted(true), []);
  if (!hasMounted) return null;
  return (
    <>
      <CreateServerModal />
    </>
  );
}
