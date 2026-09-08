<script setup lang="ts">
import { DateInputContext } from "@ark-ui/vue/date-input";
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputSegment,
  DateInputSegmentGroup,
} from "@/components/vue";
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
