<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DateInput as Ark } from "@ark-ui/vue/date-input";
import { cn } from "cn";
import { dateInput } from "@/registry/shared/lib/date-input.styles";

interface DateInputSegmentGroupProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DateInputSegmentGroupProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = dateInput();
</script>

<template>
  <Ark.SegmentGroup :class="cn(styles.segmentGroup(), props.class)">
    <slot />
  </Ark.SegmentGroup>
</template>
