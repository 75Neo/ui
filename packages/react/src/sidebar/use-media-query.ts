import { useCallback, useSyncExternalStore } from "react";

/**
 * Whether a media query currently matches, kept up to date as the viewport changes.
 *
 * @param query - Any media query string, such as `"(max-width: 1023px)"`.
 * @returns `true` while the query matches. Always `false` on the server and on the
 * first client render, so the markup either side of hydration agrees.
 *
 * @remarks
 * `useSyncExternalStore` rather than an effect and a piece of state, because the
 * answer is already stored in `matchMedia` and reading it there means a component
 * never renders a stale match. The server snapshot is `false`, so a layout starts in
 * its wide form and corrects itself on mount: the wide form is the one whose markup is
 * complete, so nothing pops into existence during hydration.
 *
 * Not exported from the package. The Sidebar is the only part that needs it.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (notify: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", notify);
      return () => list.removeEventListener("change", notify);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
