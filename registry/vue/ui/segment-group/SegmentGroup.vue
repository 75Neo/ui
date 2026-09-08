<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { SegmentGroup as Ark } from "@ark-ui/vue/segment-group";
import { cn } from "cn";
import {
  segmentGroupStyles as styles,
  type SegmentGroupSize,
} from "@/registry/shared/lib/segment-group.styles";

interface SegmentGroupProps {
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  form?: string;
  size?: SegmentGroupSize;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SegmentGroupProps>(), {
  size: "md",
  disabled: undefined,
  readOnly: undefined,
});

const value = defineModel<string | null>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :orientation="props.orientation"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :name="props.name"
    :form="props.form"
    :data-size="props.size"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
