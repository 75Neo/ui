<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { NumberInput as Ark } from "@ark-ui/vue/number-input";
import {
  Minus as MinusIcon,
  Plus as PlusIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
} from "@lucide/vue";
import { cn, numberInputDefaults, type NumberInputRootProps } from "@75neo/themes";
import { numberInputVariantsKey } from "./variants";
import NumberInputControl from "./control.vue";
import NumberInputDecrementTrigger from "./decrement-trigger.vue";
import NumberInputIncrementTrigger from "./increment-trigger.vue";
import NumberInputInput from "./input.vue";
import NumberInputLabel from "./label.vue";

const props = defineProps<
  NumberInputRootProps<Component> & {
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired on every change, including each step of a held button. */
  valueChange: [details: { value: string; valueAsNumber: number }];
  /** Fired once the field is left or Enter is pressed. */
  valueCommit: [details: { value: string; valueAsNumber: number }];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the field, leaving `defaultValue` idle.
 */
const value = defineModel<string | undefined>({ default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? numberInputDefaults.color;
  },
  get size() {
    return props.size ?? numberInputDefaults.size;
  },
  get orientation() {
    return props.orientation ?? numberInputDefaults.orientation;
  },
});
provide(numberInputVariantsKey, resolved);

// A row reads as a quantity picker and wants a minus and a plus; a column reads
// as a spinner and wants two chevrons.
const stacked = computed(() => resolved.orientation === "vertical");

const rootClass = computed(() =>
  cn("flex w-full min-w-0 flex-col gap-1.5", props.class as string | undefined),
);
</script>

<template>
  <Ark.Root
    data-slot="number-input"
    :class="rootClass"
    :data-color="resolved.color"
    :data-size="resolved.size"
    :data-orientation="resolved.orientation"
    v-model="value"
    @value-change="emit('valueChange', $event)"
    @value-commit="emit('valueCommit', $event)"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :large-step="props.largeStep"
    :small-step="props.smallStep"
    :format-options="props.formatOptions"
    :locale="props.locale"
    :allow-mouse-wheel="props.allowMouseWheel"
    :clamp-value-on-blur="props.clampValueOnBlur ?? true"
    :allow-overflow="props.allowOverflow ?? false"
    :spin-on-press="props.spinOnPress ?? true"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
  >
    <NumberInputLabel v-if="props.label != null">{{ props.label }}</NumberInputLabel>
    <NumberInputControl>
      <NumberInputInput :placeholder="props.placeholder" />
      <NumberInputDecrementTrigger>
        <component :is="props.decrementIcon ?? (stacked ? ChevronDownIcon : MinusIcon)" />
      </NumberInputDecrementTrigger>
      <NumberInputIncrementTrigger>
        <component :is="props.incrementIcon ?? (stacked ? ChevronUpIcon : PlusIcon)" />
      </NumberInputIncrementTrigger>
    </NumberInputControl>
  </Ark.Root>
</template>
