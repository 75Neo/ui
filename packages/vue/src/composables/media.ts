import { onMounted, onUnmounted, type Ref, ref } from "vue";

/**
 * Whether a media query currently matches, kept up to date as the viewport changes.
 *
 * @param query - Any media query string, such as `"(max-width: 1023px)"`.
 * @returns A ref that is `false` during the server pass and until the component mounts,
 * and tracks the query after that.
 *
 * @remarks
 * Starting at `false` means a layout reading this one renders in its wide form on the
 * server and corrects itself on mount. That is the right way round: the wide form is
 * the one whose markup is complete, so nothing pops into existence during hydration.
 */
export function useMediaQuery(query: string): Ref<boolean> {
  const matches = ref(false);

  onMounted(() => {
    const list = window.matchMedia(query);
    matches.value = list.matches;

    const notify = (event: MediaQueryListEvent) => {
      matches.value = event.matches;
    };

    list.addEventListener("change", notify);
    onUnmounted(() => list.removeEventListener("change", notify));
  });

  return matches;
}
