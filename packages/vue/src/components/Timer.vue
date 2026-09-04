<script setup lang="ts">
import { computed } from "vue";
import { Timer as Ark } from "@ark-ui/vue/timer";
import { type TimerProps, type TimerUnit, timer } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * `units` needs no `withDefaults` entry: the fallback below hands each render a fresh
 * array, so no instance shares one. `showLabels`, `controls` and `separator` default
 * on, and a type-based `defineProps` declares booleans as Boolean props, so Vue would
 * cast an absent one to `false` — leaving every timer labelless, buttonless and
 * unseparated in Vue while React worked. This is the same cast that once unticked every
 * `defaultChecked` Checkbox.
 */
const props = withDefaults(
  defineProps<
    TimerProps & {
      class?: unknown;
      ids?: { root?: string; area?: string };
    }
  >(),
  { showLabels: true, separator: ":", controls: true },
);

const emit = defineEmits<{
  /** Fired when the timer reaches its target. */
  complete: [];
  /** Fired on every tick. */
  tick: [details: { value: number }];
}>();

const theme = useResolvedTheme(
  timer,
  "timer",
  () => props,
  () => props.class as string | undefined,
);

const shown = computed<TimerUnit[]>(() => props.units ?? ["minutes", "seconds"]);

/** The buttons rendered under the digits, in order, with the text each one carries. */
const actions = [
  { action: "start", label: "Start" },
  { action: "pause", label: "Pause" },
  { action: "resume", label: "Resume" },
  { action: "reset", label: "Reset" },
] as const;
</script>

<template>
  <Ark.Root
    data-slot="base"
    :class="theme.class.base"
    :auto-start="props.autoStart"
    :countdown="props.countdown"
    :interval="props.interval"
    :start-ms="props.startMs"
    :target-ms="props.targetMs"
    :ids="props.ids"
    @complete="emit('complete')"
    @tick="emit('tick', $event)"
  >
    <Ark.Area data-slot="area" :class="theme.class.area">
      <template v-for="(unit, index) in shown" :key="unit">
        <Ark.Separator v-if="index > 0" data-slot="separator" :class="theme.class.separator">
          {{ props.separator }}
        </Ark.Separator>
        <div data-slot="itemGroup" :class="theme.class.itemGroup">
          <Ark.Item :type="unit" data-slot="item" :class="theme.class.item" />
          <span v-if="props.showLabels" data-slot="label" :class="theme.class.label">
            {{ props.labels?.[unit] ?? unit }}
          </span>
        </div>
      </template>
    </Ark.Area>

    <Ark.Control v-if="props.controls" data-slot="control" :class="theme.class.control">
      <Ark.ActionTrigger
        v-for="{ action, label } in actions"
        :key="action"
        :action="action"
        data-slot="actionTrigger"
        :class="theme.class.actionTrigger"
      >
        {{ label }}
      </Ark.ActionTrigger>
    </Ark.Control>
  </Ark.Root>
</template>
