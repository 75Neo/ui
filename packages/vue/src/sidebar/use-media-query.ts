import { onScopeDispose, ref, watchEffect, type Ref } from "vue";

/**
 * Whether a media query currently matches, kept up to date as the viewport changes.
 *
 * @param query - Any media query string, such as `"(max-width: 1023px)"`.
 * @returns `false` on the server and on the first client render, so the markup either
 * side of hydration agrees, then the real answer once mounted.
 *
 * @remarks
 * A layout reading this starts in its wide form and corrects itself: the wide form is
 * the one whose markup is complete, so nothing pops into existence during hydration.
 *
 * Not exported from the package. The Sidebar is the only part that needs it.
 */
export function useMediaQuery(query: string): Ref<boolean> {
  const matches = ref(false);

  watchEffect((onCleanup) => {
    if (typeof window === "undefined") return;
    const list = window.matchMedia(query);
    matches.value = list.matches;
    const notify = () => {
      matches.value = list.matches;
    };
    list.addEventListener("change", notify);
    onCleanup(() => list.removeEventListener("change", notify));
  });

  onScopeDispose(() => {
    matches.value = false;
  });

  return matches;
}
