<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DateInput as Ark } from "@ark-ui/vue/date-input";
import type { DateInputSegmentProps as ArkSegmentProps } from "@ark-ui/vue/date-input";
import { cn } from "cn";
import { dateInput } from "@/registry/shared/lib/date-input.styles";

interface DateInputSegmentProps {
  segment: ArkSegmentProps["segment"];
  class?: HTMLAttributes["class"];
}

const props = defineProps<DateInputSegmentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = dateInput();
</script>

<template>
  <Ark.Segment :segment="props.segment" :class="cn(styles.segment(), props.class)">
    <slot />
  </Ark.Segment>
</template>
