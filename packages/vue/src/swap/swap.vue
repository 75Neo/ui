<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { Swap as Ark } from "@ark-ui/vue/swap";
import { cn, swapDefaults, type SwapRootProps } from "@75neo/themes";
import { swapVariantsKey } from "./variants";
import SwapIndicator from "./indicator.vue";

/*
 * The prop is spelled `swapped` because `swap` is the component's own name, and a
 * prop matching its element would read as a typo at every call site.
 */
const props = defineProps<
  Omit<SwapRootProps<Component>, "swap"> & {
    /** Whether the swap shows its `on` icon. */
    swapped?: boolean;
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? swapDefaults.size;
  },
});
provide(swapVariantsKey, resolved);

const rootClass = computed(() =>
  cn("inline-flex shrink-0 items-center justify-center", props.class as string | undefined),
);
</script>

<template>
  <Ark.Root
    :swap="props.swapped"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
    data-slot="swap"
    :data-size="resolved.size"
    :class="rootClass"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <SwapIndicator type="on">
        <component :is="props.onIcon" v-if="props.onIcon" />
      </SwapIndicator>
      <SwapIndicator type="off">
        <component :is="props.offIcon" v-if="props.offIcon" />
      </SwapIndicator>
    </template>
  </Ark.Root>
</template>
