<script setup lang="ts">
import { type Component, onMounted, ref, type UnwrapRef } from "vue";
import { Tour as Ark, type UseTourReturn } from "@ark-ui/vue/tour";
import { X } from "@lucide/vue";
import { tour as tourRecipe, type TourProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The tour itself — the steps, the current position, `start()` — lives outside the
 * shared contract, because React and Vue hold Ark's tour object too differently to
 * share one type. Build it with Ark's `useTour` next to the targets it points at and
 * hand it over; this component only styles the anatomy it renders.
 *
 * The prop is typed unwrapped, exactly like Ark's own root: a template binding
 * unwraps the `useTour()` ref on the way in, so callers pass it as-is.
 */
const props = withDefaults(
  defineProps<
    TourProps<Component> & {
      class?: unknown;
      /** Built with Ark's `useTour`. Drives every part below. */
      tour: UnwrapRef<UseTourReturn>;
    }
  >(),
  /*
   * Every one of these shows something, and a type-based `defineProps` declares them
   * as Boolean props, so Vue casts an absent one to `false`. Left unnamed, the tour
   * would render a bare panel in Vue — no arrow, no overlay, no spotlight, no way
   * out — while React showed all four.
   */
  { arrow: true, backdrop: true, spotlight: true, close: true, portal: true },
);

const emit = defineEmits<{
  /** Fired whenever the current step changes. */
  stepChange: [details: { stepId: string | null }];
  /** Fired once the closing animation has finished. */
  exitComplete: [];
}>();

/*
 * Gates the teleport below. Vue casts an absent Teleport target to nothing during the
 * server pass, so the panel is left in place until the component is mounted — otherwise
 * the first client render disagrees with the server's and the page logs a hydration
 * mismatch. The Dialog does the same.
 */
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

const theme = useResolvedTheme(
  tourRecipe,
  "tour",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    :tour="props.tour"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
    @step-change="emit('stepChange', $event)"
    @exit-complete="emit('exitComplete')"
  >
    <Teleport to="body" :disabled="!props.portal || !mounted">
      <Ark.Backdrop v-if="props.backdrop" data-slot="backdrop" :class="theme.class.backdrop" />
      <Ark.Spotlight v-if="props.spotlight" data-slot="spotlight" :class="theme.class.spotlight" />
      <Ark.Positioner data-slot="positioner" :class="theme.class.positioner">
        <Ark.Content data-slot="base" :class="theme.class.base">
          <Ark.Arrow v-if="props.arrow" data-slot="arrow" :class="theme.class.arrow">
            <Ark.ArrowTip data-slot="arrowTip" :class="theme.class.arrowTip" />
          </Ark.Arrow>

          <Ark.CloseTrigger
            v-if="props.close"
            aria-label="Close tour"
            data-slot="closeTrigger"
            :class="theme.class.closeTrigger"
          >
            <component :is="props.closeIcon ?? X" />
          </Ark.CloseTrigger>

          <Ark.ProgressText data-slot="progressText" :class="theme.class.progressText" />
          <Ark.Title data-slot="title" :class="theme.class.title" />
          <Ark.Description data-slot="description" :class="theme.class.description" />

          <Ark.Control data-slot="control" :class="theme.class.control">
            <Ark.Actions v-slot="actions">
              <Ark.ActionTrigger
                v-for="action in actions"
                :key="action.label"
                :action="action"
                data-slot="actionTrigger"
                :class="theme.class.actionTrigger"
              >
                {{ action.label }}
              </Ark.ActionTrigger>
            </Ark.Actions>
          </Ark.Control>
        </Ark.Content>
      </Ark.Positioner>
    </Teleport>
  </Ark.Root>
</template>
