<script setup lang="ts">
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemControl,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
} from "@/components/vue";

const options = ["Preview", "Code", "Diff"];
</script>

<template>
  <SegmentGroup default-value="Preview">
    <SegmentGroupIndicator />
    <SegmentGroupItem v-for="option in options" :key="option" :value="option">
      <SegmentGroupItemText>{{ option }}</SegmentGroupItemText>
      <SegmentGroupItemControl />
      <SegmentGroupItemHiddenInput />
    </SegmentGroupItem>
  </SegmentGroup>
</template>
