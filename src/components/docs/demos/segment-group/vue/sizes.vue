<script setup lang="ts">
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemControl,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
} from "@/components/vue";

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <SegmentGroup v-for="size in sizes" :key="size" :size="size" default-value="Preview">
      <SegmentGroupIndicator />
      <SegmentGroupItem v-for="option in ['Preview', 'Code']" :key="option" :value="option">
        <SegmentGroupItemText>{{ option }}</SegmentGroupItemText>
        <SegmentGroupItemControl />
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
    </SegmentGroup>
  </div>
</template>
