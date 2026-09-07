<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { SegmentGroup as Ark } from "@ark-ui/vue/segment-group";
import { cn } from "cn";
import { segmentGroup } from "@/registry/shared/lib/segment-group.styles";

interface SegmentGroupLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SegmentGroupLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = segmentGroup();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
