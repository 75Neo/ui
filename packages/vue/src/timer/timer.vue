<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { Timer as Ark } from "@ark-ui/vue/timer";
import {
  cn,
  timerActions,
  timerDefaults,
  timerDefaultUnits,
  type TimerRootProps,
} from "@75neo/themes";
import { timerVariantsKey } from "./variants";
import TimerActionTrigger from "./action-trigger.vue";
import TimerArea from "./area.vue";
import TimerControl from "./control.vue";
import TimerItem from "./item.vue";
import TimerSeparator from "./separator.vue";

/*
 * `showLabels` and `controls` default to on, so each is declared: without the
 * declaration Vue casts an absent boolean to `false` and the unit names and the
 * buttons vanish on a bare timer.
 */
const props = withDefaults(
  defineProps<
    TimerRootProps & {
      class?: unknown;
    }
  >(),
  { showLabels: true, controls: true, separator: ":" },
);

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? timerDefaults.size;
  },
});
provide(timerVariantsKey, resolved);

const rootClass = computed(() =>
  cn("flex min-w-0 flex-col gap-3", props.class as string | undefined),
);
const shown = computed(() => props.units ?? [...timerDefaultUnits]);
</script>

<template>
  <Ark.Root
    :auto-start="props.autoStart"
    :countdown="props.countdown"
    :interval="props.interval"
    :start-ms="props.startMs"
    :target-ms="props.targetMs"
    data-slot="timer"
    :data-size="resolved.size"
    :class="rootClass"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <TimerArea>
        <template v-for="(unit, index) in shown" :key="unit">
          <TimerSeparator v-if="index > 0">{{ props.separator }}</TimerSeparator>
          <TimerItem :type="unit" :label="props.labels?.[unit]" :hide-label="!props.showLabels" />
        </template>
      </TimerArea>
      <TimerControl v-if="props.controls">
        <TimerActionTrigger
          v-for="entry in timerActions"
          :key="entry.action"
          :action="entry.action"
        >
          {{ entry.label }}
        </TimerActionTrigger>
      </TimerControl>
    </template>
  </Ark.Root>
</template>
