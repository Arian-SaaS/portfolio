import { useCallback, useSyncExternalStore } from "react";

/**
 * Tracks a media query without tripping hydration.
 *
 * The server has no viewport, so the server snapshot is always `false` and the
 * first client paint matches it. Anything driven by this should therefore read
 * correctly when false — treat it as "narrow layout off until proven on",
 * never as "desktop by default".
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
