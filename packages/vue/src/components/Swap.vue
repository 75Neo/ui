<script setup lang="ts">
import type { Component } from "vue";
import { Swap as Ark } from "@ark-ui/vue/swap";
import { type SwapProps, swap } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The state is display-only — nothing inside a swap flips it — so `swap` is a plain
 * prop rather than a model, and there is no change event. An absent Boolean prop casts
 * to `false`, which is the default anyway, so no `withDefaults` entry is needed.
 */
const props = defineProps<
  SwapProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  /** Replaces the icon shown while on. Falls back to `onIcon`. */
  onIcon?: () => unknown;
  /** Replaces the icon shown while off. Falls back to `offIcon`. */
  offIcon?: () => unknown;
}>();

const theme = useResolvedTheme(
  swap,
  "swap",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    data-slot="base"
    :class="theme.class.base"
    :swap="props.swap"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
  >
    <Ark.Indicator type="on" data-slot="onIcon" :class="theme.class.onIcon">
      <slot name="onIcon">
        <component :is="props.onIcon" v-if="props.onIcon != null" />
      </slot>
    </Ark.Indicator>
    <Ark.Indicator type="off" data-slot="offIcon" :class="theme.class.offIcon">
      <slot name="offIcon">
        <component :is="props.offIcon" v-if="props.offIcon != null" />
      </slot>
    </Ark.Indicator>
  </Ark.Root>
</template>
