<script setup lang="ts">
import SegmentGroup from "@/registry/vue/ui/segment-group/SegmentGroup.vue";
import SegmentGroupIndicator from "@/registry/vue/ui/segment-group/SegmentGroupIndicator.vue";
import SegmentGroupItem from "@/registry/vue/ui/segment-group/SegmentGroupItem.vue";
import SegmentGroupItemControl from "@/registry/vue/ui/segment-group/SegmentGroupItemControl.vue";
import SegmentGroupItemHiddenInput from "@/registry/vue/ui/segment-group/SegmentGroupItemHiddenInput.vue";
import SegmentGroupItemText from "@/registry/vue/ui/segment-group/SegmentGroupItemText.vue";

const options = ["Preview", "Code", "Diff"];
</script>

<template>
  <div class="flex justify-center">
    <SegmentGroup default-value="Preview">
      <SegmentGroupIndicator />
      <SegmentGroupItem v-for="option in options" :key="option" :value="option">
        <SegmentGroupItemText>{{ option }}</SegmentGroupItemText>
        <SegmentGroupItemControl />
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
    </SegmentGroup>
  </div>
</template>
