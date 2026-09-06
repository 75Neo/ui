<script setup lang="ts">
import { type Component, computed } from "vue";
import { ToggleGroup as Ark } from "@ark-ui/vue/toggle-group";
import { cva } from "class-variance-authority";
import {
  cn,
  toggleGroupDefaults,
  toggleGroupItemCompoundData,
  toggleGroupSizeData,
  type ToggleGroupItemProps,
} from "@75neo/themes";
import { useToggleGroupVariants } from "./variants";
import ToggleGroupItemText from "./item-text.vue";

const toggleGroupItem = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: {
      variant: { solid: "", outline: "", soft: "", subtle: "", ghost: "" },
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: toggleGroupSizeData.item,
    },
    compoundVariants: toggleGroupItemCompoundData,
    defaultVariants: toggleGroupDefaults,
  },
);

const props = defineProps<
  ToggleGroupItemProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useToggleGroupVariants();
const itemClass = computed(() => cn(toggleGroupItem(variants), props.class as string | undefined));
const glyph = computed(() => props.leadingIcon ?? props.item.icon);
const leadingClass = computed(() =>
  cn("shrink-0 [&>svg]:size-full", toggleGroupSizeData.leadingIcon[variants.size]),
);
</script>

<template>
  <Ark.Item
    :value="props.item.value"
    :disabled="props.item.disabled"
    data-slot="toggle-group-item"
    :class="itemClass"
  >
    <span v-if="glyph != null" data-slot="toggle-group-leading-icon" :class="leadingClass">
      <component :is="glyph" />
    </span>
    <slot>
      <ToggleGroupItemText>{{ props.item.label }}</ToggleGroupItemText>
    </slot>
  </Ark.Item>
</template>
