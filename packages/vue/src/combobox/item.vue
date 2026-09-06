<script setup lang="ts">
import { type Component, computed } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cva } from "class-variance-authority";
import { Check as CheckIcon } from "@lucide/vue";
import {
  cn,
  comboboxDefaults,
  comboboxItemCompoundData,
  comboboxSizeData,
  type ComboboxItemProps,
} from "@75neo/themes";
import { useComboboxVariants } from "./variants";
import ComboboxItemIndicator from "./item-indicator.vue";
import ComboboxItemText from "./item-text.vue";

const comboboxItem = cva(
  "flex cursor-pointer items-center rounded-md text-toned select-none data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: comboboxSizeData.item,
    },
    compoundVariants: comboboxItemCompoundData,
    defaultVariants: comboboxDefaults,
  },
);

const props = defineProps<
  ComboboxItemProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useComboboxVariants();
const itemClass = computed(() => cn(comboboxItem(variants), props.class as string | undefined));
const glyph = computed(() => props.leadingIcon ?? props.item.icon);
const leadingClass = computed(() =>
  cn("shrink-0 text-dimmed [&>svg]:size-full", comboboxSizeData.leadingIcon[variants.size]),
);
</script>

<template>
  <Ark.Item :item="props.item" data-slot="combobox-item" :class="itemClass">
    <span v-if="glyph != null" data-slot="combobox-leading-icon" :class="leadingClass">
      <component :is="glyph" />
    </span>
    <slot>
      <ComboboxItemText>{{ props.item.label }}</ComboboxItemText>
    </slot>
    <ComboboxItemIndicator>
      <component :is="props.selectedIcon ?? CheckIcon" />
    </ComboboxItemIndicator>
  </Ark.Item>
</template>
