<script setup lang="ts">
import {
  Timer,
  TimerActionTrigger,
  TimerArea,
  TimerControl,
  TimerItem,
  TimerSeparator,
} from "@/components/vue";
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <Timer :start-ms="90 * 60 * 1000" countdown auto-start>
      <TimerArea>
        <TimerItem type="hours" />
        <TimerSeparator>:</TimerSeparator>
        <TimerItem type="minutes" />
        <TimerSeparator>:</TimerSeparator>
        <TimerItem type="seconds" />
      </TimerArea>

      <TimerControl>
        <TimerActionTrigger action="start">Start</TimerActionTrigger>
        <TimerActionTrigger action="pause">Pause</TimerActionTrigger>
        <TimerActionTrigger action="reset">Reset</TimerActionTrigger>
      </TimerControl>
    </Timer>
  </div>
</template>
