<script setup lang="ts">
import { type Component, computed } from "vue";
import { SegmentGroup as Ark } from "@ark-ui/vue/segment-group";
import { cva } from "class-variance-authority";
import {
  cn,
  segmentGroupDefaults,
  segmentGroupItemCompoundData,
  segmentGroupOrientationData,
  segmentGroupSizeData,
  type SegmentGroupItemProps,
} from "@75neo/themes";
import { useSegmentGroupVariants } from "./variants";
import SegmentGroupItemText from "./item-text.vue";

const segmentGroupItem = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-sm font-medium whitespace-nowrap text-toned transition-colors outline-none select-none hover:text-highlighted data-disabled:cursor-not-allowed data-disabled:opacity-75",
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
      size: segmentGroupSizeData.item,
      orientation: segmentGroupOrientationData.item,
    },
    compoundVariants: segmentGroupItemCompoundData,
    defaultVariants: segmentGroupDefaults,
  },
);

const props = defineProps<
  SegmentGroupItemProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useSegmentGroupVariants();
const itemClass = computed(() => cn(segmentGroupItem(variants), props.class as string | undefined));
const glyph = computed(() => props.leadingIcon ?? props.item.icon);
</script>

<template>
  <Ark.Item
    :value="props.item.value"
    :disabled="props.item.disabled"
    data-slot="segment-group-item"
    :class="itemClass"
  >
    <span
      v-if="glyph != null"
      data-slot="segment-group-leading-icon"
      :class="cn('shrink-0 [&>svg]:size-[1em]')"
    >
      <component :is="glyph" />
    </span>
    <slot>
      <SegmentGroupItemText>{{ props.item.label }}</SegmentGroupItemText>
    </slot>
    <Ark.ItemControl />
    <Ark.ItemHiddenInput />
  </Ark.Item>
</template>
