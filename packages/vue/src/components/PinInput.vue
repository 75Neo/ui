<script setup lang="ts">
import { computed } from "vue";
import { PinInput as Ark } from "@ark-ui/vue/pin-input";
import { defaultPinInputLength, pinInput, type PinInputProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The value lives outside the shared contract, because React and Vue spell a controlled
 * value too differently to share one type. Here it is `v-model`, holding one entry per
 * box rather than the joined code.
 */
const props = defineProps<
  PinInputProps & {
    defaultValue?: string[];
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired on every character typed or removed. */
  valueChange: [details: { value: string[]; valueAsString: string }];
  /** Fired once every box is filled. */
  valueComplete: [details: { value: string[]; valueAsString: string }];
}>();

defineSlots<{
  /** Replaces the caption above the row. Falls back to `label`. */
  label?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the row to a controlled one, which would leave
 * `defaultValue` with nothing to do.
 */
const value = defineModel<string[] | undefined>({ default: undefined });

/*
 * The count reaches Ark so its own ARIA can say which box is which, and the same number
 * draws the boxes here. Ark has no part that renders them for us: each one takes the
 * index it sits at.
 */
const count = computed(() => props.length ?? defaultPinInputLength);

const theme = useResolvedTheme(
  pinInput,
  "pinInput",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model="value"
    data-slot="base"
    :class="theme.class.base"
    :count="count"
    :default-value="props.defaultValue"
    :placeholder="props.placeholder"
    :type="props.type"
    :otp="props.otp"
    :mask="props.mask"
    :auto-focus="props.autoFocus"
    :blur-on-complete="props.blurOnComplete"
    :select-on-focus="props.selectOnFocus"
    :pattern="props.pattern"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    @value-change="emit('valueChange', $event)"
    @value-complete="emit('valueComplete', $event)"
  >
    <Ark.Label
      v-if="props.label != null || $slots.label"
      data-slot="label"
      :class="theme.class.label"
    >
      <slot name="label">{{ props.label }}</slot>
    </Ark.Label>

    <Ark.Control data-slot="control" :class="theme.class.control">
      <Ark.Input
        v-for="index in count"
        :key="index"
        :index="index - 1"
        data-slot="input"
        :class="theme.class.input"
      />
    </Ark.Control>

    <!--
      The one part with no slot of its own: it is hidden by contract, so a class on it
      would style nothing. It is what puts the joined code into a form.
    -->
    <Ark.HiddenInput />
  </Ark.Root>
</template>
