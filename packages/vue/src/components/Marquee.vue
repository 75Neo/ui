<script setup lang="ts">
import { computed } from "vue";
import { Marquee as Ark, type MarqueeSide } from "@ark-ui/vue/marquee";
import { type MarqueeItem, type MarqueeProps, marquee } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The pause state lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model:paused`,
 * with `defaultPaused` as the uncontrolled counterpart Ark's root already takes.
 */
const props = defineProps<
  MarqueeProps & {
    class?: unknown;
    defaultPaused?: boolean;
    ids?: { root?: string; viewport?: string; content?: (index: number) => string };
  }
>();

const emit = defineEmits<{
  /** Fired when the pause status changes. */
  pauseChange: [details: { paused: boolean }];
  /** Fired when the marquee completes all loops and stops. Only fires for finite loops. */
  complete: [];
  /** Fired when the marquee completes one loop iteration. */
  loopComplete: [];
}>();

defineSlots<{
  /** Replace an item's text with arbitrary markup. Falls back to `item.content`. */
  item?: (props: { item: MarqueeItem; index: number }) => unknown;
}>();

/*
 * `default: undefined` is load-bearing, and `undefined` in the type argument is what
 * lets it typecheck. `defineModel` declares `paused` as a Boolean prop, and Vue casts
 * an absent Boolean prop to `false` unless the declaration carries a default — which
 * would pin every marquee to a controlled unpaused state. Ark's own root carries the
 * same defaults.
 */
const paused = defineModel<boolean | undefined>("paused", { default: undefined });

const theme = useResolvedTheme(
  marquee,
  "marquee",
  () => props,
  () => props.class as string | undefined,
);

// The variant defaults to `"start"`, so the edges follow the same fallback: a caller
// that never names a side scrolls horizontally.
const edgeSides = computed<MarqueeSide[]>(() => {
  const direction = props.side ?? "start";
  return direction === "top" || direction === "bottom" ? ["top", "bottom"] : ["start", "end"];
});
</script>

<template>
  <Ark.Root
    v-model:paused="paused"
    data-slot="base"
    :class="theme.class.base"
    :side="props.side"
    :auto-fill="props.autoFill"
    :spacing="props.spacing"
    :delay="props.delay"
    :loop-count="props.loopCount"
    :reverse="props.reverse"
    :default-paused="props.defaultPaused"
    :pause-on-interaction="props.pauseOnInteraction"
    :ids="props.ids"
    @pause-change="emit('pauseChange', $event)"
    @complete="emit('complete')"
    @loop-complete="emit('loopComplete')"
  >
    <Ark.Edge
      v-if="props.edge"
      v-for="edgeSide in edgeSides"
      :key="edgeSide"
      :side="edgeSide"
      data-slot="edge"
      :class="theme.class.edge"
    />
    <Ark.Viewport data-slot="viewport" :class="theme.class.viewport">
      <Ark.Content data-slot="content" :class="theme.class.content">
        <Ark.Item
          v-for="(item, index) in props.items"
          :key="item.id"
          data-slot="item"
          :class="theme.class.item"
        >
          <slot name="item" :item="item" :index="index">{{ item.content }}</slot>
        </Ark.Item>
      </Ark.Content>
    </Ark.Viewport>
  </Ark.Root>
</template>
