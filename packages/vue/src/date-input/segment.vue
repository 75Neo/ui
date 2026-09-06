<script setup lang="ts">
import { computed } from "vue";
import { DateInput as Ark } from "@ark-ui/vue/date-input";
import { cva } from "class-variance-authority";
import {
  cn,
  dateInputDefaults,
  dateInputSegmentCompoundData,
  dateInputSizeData,
} from "@75neo/themes";
import { useDateInputVariants } from "./variants";

const dateInputSegment = cva(
  "rounded-sm text-highlighted tabular-nums outline-none data-placeholder-shown:text-dimmed data-[type=literal]:px-0 data-[type=literal]:text-dimmed",
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
      size: dateInputSizeData.segment,
    },
    compoundVariants: dateInputSegmentCompoundData,
    defaultVariants: dateInputDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  segment?: any;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useDateInputVariants();
const segmentClass = computed(() =>
  cn(dateInputSegment(variants), props.class as string | undefined),
);
</script>

<!--
  `segment` rides fallthrough onto Ark's part: its type lives in Ark's deep files,
  which the package index never re-exports, so declaring it would trade a checked
  prop for an `any`. The root mapping passes Ark's own object, which is already the
  right shape.
-->
<template>
  <Ark.Segment data-slot="date-input-segment" :class="segmentClass" :segment="props.segment">
    <slot />
  </Ark.Segment>
</template>
