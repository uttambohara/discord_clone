"use client";

import { useModalStore } from "@/hooks/use-modal";
import { useEffect } from "react";

export default function DisplayCreateServerModal() {
  const { onOpen } = useModalStore();

  useEffect(() => onOpen("createServer"), []);
  return null;
}
