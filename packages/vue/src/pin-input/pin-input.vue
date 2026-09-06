<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { PinInput as Ark } from "@ark-ui/vue/pin-input";
import { cn, defaultPinInputLength, pinInputDefaults, type PinInputRootProps } from "@75neo/themes";
import { pinInputVariantsKey } from "./variants";
import PinInputControl from "./control.vue";
import PinInputInput from "./input.vue";
import PinInputLabel from "./label.vue";

const props = defineProps<
  PinInputRootProps & {
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
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the row, leaving `defaultValue` idle.
 */
const value = defineModel<string[] | undefined>({ default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? pinInputDefaults.color;
  },
  get size() {
    return props.size ?? pinInputDefaults.size;
  },
});
provide(pinInputVariantsKey, resolved);

const count = computed(() => props.length ?? defaultPinInputLength);

const rootClass = computed(() => cn("flex flex-col gap-1.5", props.class as string | undefined));
</script>

<template>
  <Ark.Root
    data-slot="pin-input"
    :class="rootClass"
    :data-color="resolved.color"
    :data-size="resolved.size"
    v-model="value"
    @value-change="emit('valueChange', $event)"
    @value-complete="emit('valueComplete', $event)"
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
  >
    <PinInputLabel v-if="props.label != null">{{ props.label }}</PinInputLabel>
    <PinInputControl>
      <PinInputInput v-for="index in count" :key="index" :index="index - 1" />
    </PinInputControl>
    <Ark.HiddenInput />
  </Ark.Root>
</template>
