<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { SegmentGroup as Ark } from "@ark-ui/vue/segment-group";
import { cn } from "cn";
import { segmentGroup } from "@/registry/shared/lib/segment-group.styles";

interface SegmentGroupItemTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SegmentGroupItemTextProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = segmentGroup();
</script>

<template>
  <Ark.ItemText :class="cn(styles.itemText(), props.class)">
    <slot />
  </Ark.ItemText>
</template>
