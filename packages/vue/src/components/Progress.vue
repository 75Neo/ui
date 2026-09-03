<script setup lang="ts">
import { Progress as Ark } from "@ark-ui/vue/progress";
import { type ProgressProps, progress } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The value lives outside the shared contract, because React and Vue spell a controlled
 * value too differently to share one type. Here it is `v-model`, with `defaultValue` as
 * the uncontrolled counterpart Ark's root already takes. `null` is the indeterminate
 * state, which is what a bar shows while it has nothing to measure.
 */
const props = defineProps<
  ProgressProps & {
    class?: unknown;
    defaultValue?: number | null;
    ids?: { root?: string; track?: string; label?: string; circle?: string };
  }
>();

const emit = defineEmits<{
  /** Fired whenever the value changes. */
  valueChange: [details: { value: number | null }];
}>();

defineSlots<{
  /** Overrides the `label` prop. */
  label?: () => unknown;
}>();

/*
 * A number model needs no `default: undefined`: the cast that catches Boolean props
 * leaves everything else alone. `null` has to survive it, though, because that is the
 * indeterminate state rather than the absence of one.
 */
const value = defineModel<number | null | undefined>({ default: undefined });

const theme = useResolvedTheme(
  progress,
  "progress",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model="value"
    data-slot="base"
    :class="theme.class.base"
    :default-value="props.defaultValue"
    :min="props.min"
    :max="props.max"
    :orientation="props.orientation"
    :format-options="props.formatOptions"
    :locale="props.locale"
    :ids="props.ids"
    @value-change="emit('valueChange', $event)"
  >
    <div
      v-if="props.label != null || $slots.label || props.showValue"
      data-slot="header"
      :class="theme.class.header"
    >
      <Ark.Label
        v-if="props.label != null || $slots.label"
        data-slot="label"
        :class="theme.class.label"
      >
        <slot name="label">{{ props.label }}</slot>
      </Ark.Label>
      <Ark.ValueText v-if="props.showValue" data-slot="valueText" :class="theme.class.valueText" />
    </div>

    <Ark.Track data-slot="track" :class="theme.class.track">
      <Ark.Range data-slot="range" :class="theme.class.range" />
    </Ark.Track>
  </Ark.Root>
</template>
