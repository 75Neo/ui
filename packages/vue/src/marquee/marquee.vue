<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { Marquee as Ark } from "@ark-ui/vue/marquee";
import { cn, marqueeDefaults, type MarqueeRootProps } from "@75neo/themes";
import { marqueeVariantsKey } from "./variants";
import MarqueeContent from "./content.vue";
import MarqueeEdge from "./edge.vue";
import MarqueeItem from "./item.vue";
import MarqueeViewport from "./viewport.vue";

const props = defineProps<
  MarqueeRootProps & {
    class?: unknown;
  }
>();

const paused = defineModel<boolean | undefined>("paused", { default: undefined });

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get side() {
    return props.side ?? marqueeDefaults.side;
  },
  get size() {
    return props.size ?? marqueeDefaults.size;
  },
  get speed() {
    return props.speed ?? marqueeDefaults.speed;
  },
});
provide(marqueeVariantsKey, resolved);

const rootClass = computed(() =>
  cn(
    "relative w-full overflow-hidden data-paused:**:[animation-play-state:paused] data-[orientation=vertical]:h-60",
    props.class as string | undefined,
  ),
);
const items = computed(() => props.items ?? []);
// The edges follow the side, so a marquee that never names one fades left and right.
const edgeSides = computed(() =>
  resolved.side === "top" || resolved.side === "bottom"
    ? (["top", "bottom"] as const)
    : (["start", "end"] as const),
);
</script>

<template>
  <Ark.Root
    v-model:paused="paused"
    :side="props.side"
    :auto-fill="props.autoFill"
    :spacing="props.spacing"
    :delay="props.delay"
    :loop-count="props.loopCount"
    :reverse="props.reverse"
    :pause-on-interaction="props.pauseOnInteraction"
    data-slot="marquee"
    :data-size="resolved.size"
    :data-speed="resolved.speed"
    :class="rootClass"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <MarqueeEdge
        v-for="edgeSide in props.edge ? edgeSides : []"
        :key="edgeSide"
        :side="edgeSide"
      />
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem v-for="item in items" :key="item.id">{{ item.content }}</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
    </template>
  </Ark.Root>
</template>
