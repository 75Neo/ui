<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { SegmentGroup as Ark } from "@ark-ui/vue/segment-group";
import { cn } from "cn";
import { segmentGroupStyles as styles } from "@/registry/shared/lib/segment-group.styles";

interface SegmentGroupItemControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SegmentGroupItemControlProps>();
</script>

<template>
  <Ark.ItemControl :class="cn(styles.itemControl(), props.class)" />
</template>
