"use client";

import { useEffect, useState } from "react";

export default function useOrigin() {
  const [hasMounted, setHasMounted] = useState(false);

  const origin =
    typeof window !== undefined &&
    (window.location.origin ? window.location.origin : "");
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) {
    return null;
  }

  return origin;
}
