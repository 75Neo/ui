<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { SegmentGroup as Ark } from "@ark-ui/vue/segment-group";
import { cn } from "cn";
import { segmentGroupStyles as styles } from "@/registry/shared/lib/segment-group.styles";

interface SegmentGroupItemProps {
  value: string;
  disabled?: boolean;
  invalid?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SegmentGroupItemProps>(), {
  disabled: undefined,
  invalid: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Item
    :value="props.value"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :class="cn(styles.item(), props.class)"
  >
    <slot />
  </Ark.Item>
</template>
