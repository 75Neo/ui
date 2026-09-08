<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { SegmentGroup as Ark } from "@ark-ui/vue/segment-group";
import { cn } from "cn";
import { segmentGroupStyles as styles } from "@/registry/shared/lib/segment-group.styles";

interface SegmentGroupIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SegmentGroupIndicatorProps>();
</script>

<template>
  <Ark.Indicator :class="cn(styles.indicator(), props.class)" />
</template>
