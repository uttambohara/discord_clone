import { useEffect, useState } from "react";

export default function useOrigin() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  const origin =
    typeof window !== undefined && window.location.origin
      ? window.location.origin
      : undefined;

  if (!hasMounted) {
    return null;
  }

  return origin;
}
