<script setup lang="ts">
import { DateInputContext } from "@ark-ui/vue/date-input";
import DateInput from "@/registry/vue/ui/date-input/DateInput.vue";
import DateInputControl from "@/registry/vue/ui/date-input/DateInputControl.vue";
import DateInputHiddenInput from "@/registry/vue/ui/date-input/DateInputHiddenInput.vue";
import DateInputLabel from "@/registry/vue/ui/date-input/DateInputLabel.vue";
import DateInputSegment from "@/registry/vue/ui/date-input/DateInputSegment.vue";
import DateInputSegmentGroup from "@/registry/vue/ui/date-input/DateInputSegmentGroup.vue";
</script>

<template>
  <div class="max-w-56">
    <DateInput>
      <DateInputLabel>Release date</DateInputLabel>
      <DateInputControl>
        <DateInputSegmentGroup>
          <DateInputContext v-slot="dateInput">
            <DateInputSegment
              v-for="(segment, index) in dateInput.getSegments()"
              :key="index"
              :segment="segment"
            >
              {{ segment.text }}
            </DateInputSegment>
          </DateInputContext>
        </DateInputSegmentGroup>
      </DateInputControl>
      <DateInputHiddenInput />
    </DateInput>
  </div>
</template>
