<script setup lang="ts">
import { computed } from "vue";
import { Collapsible as Ark } from "@ark-ui/vue/collapsible";
import { cva } from "class-variance-authority";
import {
  cn,
  collapsibleDefaults,
  collapsibleSizeData,
  collapsibleVariantData,
} from "@75neo/themes";
import { useCollapsibleVariants } from "./variants";

const collapsibleContent = cva("overflow-hidden", {
  variants: { variant: collapsibleVariantData.content },
  defaultVariants: collapsibleDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useCollapsibleVariants();
const contentClass = computed(() =>
  cn(collapsibleContent({ variant: variants.variant }), props.class as string | undefined),
);
const bodyClass = computed(() =>
  cn("min-w-0 text-pretty text-toned", collapsibleSizeData.body[variants.size]),
);
</script>

<template>
  <Ark.Content data-slot="collapsible-content" :class="contentClass">
    <div data-slot="collapsible-body" :class="bodyClass">
      <slot />
    </div>
  </Ark.Content>
</template>
