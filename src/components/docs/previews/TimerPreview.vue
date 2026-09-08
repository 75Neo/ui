<script setup lang="ts">
import Timer from "@/registry/vue/ui/timer/Timer.vue";
import TimerActionTrigger from "@/registry/vue/ui/timer/TimerActionTrigger.vue";
import TimerArea from "@/registry/vue/ui/timer/TimerArea.vue";
import TimerControl from "@/registry/vue/ui/timer/TimerControl.vue";
import TimerItem from "@/registry/vue/ui/timer/TimerItem.vue";
import TimerSeparator from "@/registry/vue/ui/timer/TimerSeparator.vue";
import { TimerContext } from "@ark-ui/vue/timer";

const units = ["hours", "minutes", "seconds"] as const;
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <Timer :target-ms="90 * 60 * 1000" countdown auto-start>
      <TimerArea>
        <TimerContext v-slot="timer">
          <template v-for="(unit, index) in units" :key="unit">
            <TimerItem :type="unit">
              <span class="font-mono text-lg leading-none text-default tabular-nums">
                {{ timer.formattedTime[unit] }}
              </span>
              <span class="text-[0.625rem] text-dimmed uppercase">{{ unit }}</span>
            </TimerItem>
            <TimerSeparator v-if="index < units.length - 1">:</TimerSeparator>
          </template>
        </TimerContext>
      </TimerArea>

      <TimerControl>
        <TimerActionTrigger action="start">Start</TimerActionTrigger>
        <TimerActionTrigger action="pause">Pause</TimerActionTrigger>
        <TimerActionTrigger action="reset">Reset</TimerActionTrigger>
      </TimerControl>
    </Timer>
  </div>
</template>
