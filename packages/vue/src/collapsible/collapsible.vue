<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { Collapsible as Ark } from "@ark-ui/vue/collapsible";
import { cva } from "class-variance-authority";
import {
  cn,
  collapsibleDefaults,
  collapsibleVariantData,
  type CollapsibleRootProps,
} from "@75neo/themes";
import { collapsibleVariantsKey } from "./variants";

const collapsibleRoot = cva("flex min-w-0 flex-col", {
  variants: { variant: collapsibleVariantData.root },
  defaultVariants: collapsibleDefaults,
});

const props = defineProps<
  CollapsibleRootProps & {
    class?: unknown;
  }
>();

// `undefined`, so an unset `v-model:open` leaves Ark uncontrolled.
const open = defineModel<boolean | undefined>("open", { default: undefined });

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get variant() {
    return props.variant ?? collapsibleDefaults.variant;
  },
  get size() {
    return props.size ?? collapsibleDefaults.size;
  },
});
provide(collapsibleVariantsKey, resolved);

const rootClass = computed(() =>
  cn(collapsibleRoot({ variant: resolved.variant }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Root
    v-model:open="open"
    :disabled="props.disabled"
    :collapsed-height="props.collapsedHeight"
    :unmount-on-exit="props.unmountOnExit"
    :lazy-mount="props.lazyMount"
    data-slot="collapsible"
    :data-variant="resolved.variant"
    :data-size="resolved.size"
    :class="rootClass"
  >
    <slot />
  </Ark.Root>
</template>
