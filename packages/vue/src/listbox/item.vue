<script setup lang="ts">
import { type Component, computed } from "vue";
import { Listbox as Ark } from "@ark-ui/vue/listbox";
import { cva } from "class-variance-authority";
import { Check as CheckIcon } from "@lucide/vue";
import {
  cn,
  listboxDefaults,
  listboxItemCompoundData,
  listboxSizeData,
  type ListboxItemProps,
} from "@75neo/themes";
import { useListboxVariants } from "./variants";
import ListboxItemIndicator from "./item-indicator.vue";
import ListboxItemText from "./item-text.vue";

const listboxItem = cva(
  "flex cursor-pointer items-center rounded-md text-toned outline-none select-none data-disabled:cursor-not-allowed data-disabled:opacity-75",
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
      size: listboxSizeData.item,
    },
    compoundVariants: listboxItemCompoundData,
    defaultVariants: listboxDefaults,
  },
);

const props = defineProps<
  ListboxItemProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useListboxVariants();
const itemClass = computed(() => cn(listboxItem(variants), props.class as string | undefined));
const glyph = computed(() => props.leadingIcon ?? props.item.icon);
const leadingClass = computed(() =>
  cn("shrink-0 text-dimmed [&>svg]:size-full", listboxSizeData.leadingIcon[variants.size]),
);
</script>

<template>
  <Ark.Item :item="props.item" data-slot="listbox-item" :class="itemClass">
    <span v-if="glyph != null" data-slot="listbox-leading-icon" :class="leadingClass">
      <component :is="glyph" />
    </span>
    <slot>
      <ListboxItemText>{{ props.item.label }}</ListboxItemText>
    </slot>
    <ListboxItemIndicator>
      <component :is="props.selectedIcon ?? CheckIcon" />
    </ListboxItemIndicator>
  </Ark.Item>
</template>
