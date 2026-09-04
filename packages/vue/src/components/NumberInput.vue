<script setup lang="ts">
import { type Component, computed } from "vue";
import { NumberInput as Ark } from "@ark-ui/vue/number-input";
import { ChevronDown, ChevronUp, Minus, Plus } from "@lucide/vue";
import { numberInput, type NumberInputProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The value lives outside the shared contract, because React and Vue spell a controlled
 * value too differently to share one type. Here it is `v-model`, holding the field's
 * text rather than a number, for the reason the contract gives.
 */
const props = withDefaults(
  defineProps<
    NumberInputProps<Component> & {
      defaultValue?: string;
      class?: unknown;
    }
  >(),
  /*
   * These three are given `undefined` rather than a value. Naming them at all is what
   * matters: Vue casts an absent Boolean-typed prop to `false` only when no default is
   * declared, so declaring one — even an empty one — leaves them absent for the
   * resolution below to decide. Every other boolean here defaults to off, which is
   * what the cast produces anyway.
   */
  { clampValueOnBlur: undefined, allowOverflow: undefined, spinOnPress: undefined },
);

const emit = defineEmits<{
  /** Fired on every change, including each step of a held button. */
  valueChange: [details: { value: string; valueAsNumber: number }];
  /** Fired once the field is left or Enter is pressed. */
  valueCommit: [details: { value: string; valueAsNumber: number }];
}>();

defineSlots<{
  /** Replaces the caption above the control. Falls back to `label`. */
  label?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the field to a controlled one, which would leave
 * `defaultValue` with nothing to do.
 */
const value = defineModel<string | undefined>({ default: undefined });

/*
 * A row reads as a quantity picker and wants a minus and a plus; a column reads as a
 * spinner and wants two chevrons. Either icon prop replaces its default, so a caller
 * who wants one shape with the other's icons still gets it.
 */
const stacked = computed(() => (props.orientation ?? "horizontal") === "vertical");

/*
 * Resolved here rather than left for Ark, because forwarding an absent prop as
 * `undefined` overwrites the machine's own default with nothing and quietly turns the
 * behaviour off. Writing them out also keeps the derived one derived: clamping on blur
 * is the opposite of allowing overflow unless a caller says otherwise.
 */
const overflows = computed(() => props.allowOverflow ?? false);
const clamps = computed(() => props.clampValueOnBlur ?? !overflows.value);
const spins = computed(() => props.spinOnPress ?? true);

const theme = useResolvedTheme(
  numberInput,
  "numberInput",
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
    :step="props.step"
    :large-step="props.largeStep"
    :small-step="props.smallStep"
    :format-options="props.formatOptions"
    :locale="props.locale"
    :allow-mouse-wheel="props.allowMouseWheel"
    :clamp-value-on-blur="clamps"
    :allow-overflow="overflows"
    :spin-on-press="spins"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    @value-change="emit('valueChange', $event)"
    @value-commit="emit('valueCommit', $event)"
  >
    <Ark.Label
      v-if="props.label != null || $slots.label"
      data-slot="label"
      :class="theme.class.label"
    >
      <slot name="label">{{ props.label }}</slot>
    </Ark.Label>

    <Ark.Control data-slot="control" :class="theme.class.control">
      <!--
        Written in reading order — the field, then down, then up — and placed by the
        recipe. The row moves them with `order` and the column by grid line, so the
        markup never has to know which arrangement it is in.
      -->
      <Ark.Input data-slot="input" :class="theme.class.input" :placeholder="props.placeholder" />
      <Ark.DecrementTrigger data-slot="decrementTrigger" :class="theme.class.decrementTrigger">
        <component :is="props.decrementIcon ?? (stacked ? ChevronDown : Minus)" />
      </Ark.DecrementTrigger>
      <Ark.IncrementTrigger data-slot="incrementTrigger" :class="theme.class.incrementTrigger">
        <component :is="props.incrementIcon ?? (stacked ? ChevronUp : Plus)" />
      </Ark.IncrementTrigger>
    </Ark.Control>
  </Ark.Root>
</template>
