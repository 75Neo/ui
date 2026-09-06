<script setup lang="ts">
import { type Component, computed } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cva } from "class-variance-authority";
import { Check as CheckIcon } from "@lucide/vue";
import {
  cn,
  selectDefaults,
  selectItemCompoundData,
  selectSizeData,
  type SelectItemProps,
} from "@75neo/themes";
import { useSelectVariants } from "./variants";
import SelectItemIndicator from "./item-indicator.vue";
import SelectItemText from "./item-text.vue";

const selectItem = cva(
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
      size: selectSizeData.item,
    },
    compoundVariants: selectItemCompoundData,
    defaultVariants: selectDefaults,
  },
);

const props = defineProps<
  SelectItemProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useSelectVariants();
const itemClass = computed(() => cn(selectItem(variants), props.class as string | undefined));
const glyph = computed(() => props.leadingIcon ?? props.item.icon);
const leadingClass = computed(() =>
  cn("shrink-0 text-dimmed [&>svg]:size-full", selectSizeData.leadingIcon[variants.size]),
);
</script>

<template>
  <Ark.Item :item="props.item" data-slot="select-item" :class="itemClass">
    <span v-if="glyph != null" data-slot="select-leading-icon" :class="leadingClass">
      <component :is="glyph" />
    </span>
    <slot>
      <SelectItemText>{{ props.item.label }}</SelectItemText>
    </slot>
    <SelectItemIndicator>
      <component :is="props.selectedIcon ?? CheckIcon" />
    </SelectItemIndicator>
  </Ark.Item>
</template>
