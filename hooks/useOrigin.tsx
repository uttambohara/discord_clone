import { useEffect, useState } from "react";

export default function useOrigin() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  const origin =
    typeof window && window.location.origin ? window.location.origin : "";

  if (!hasMounted) {
    return null;
  }

  return origin;
}
