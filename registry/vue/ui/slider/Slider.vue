<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cn } from "cn";
import { slider, type Intent } from "@/registry/shared/lib/slider.styles";

interface SliderProps {
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  largeStep?: number;
  minStepsBetweenThumbs?: number;
  origin?: "start" | "center";
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  name?: string;
  form?: string;
  color?: Intent;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SliderProps>(), {
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
});

const value = defineModel<number[]>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = computed(() => slider({ color: props.color }));
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :large-step="props.largeStep"
    :min-steps-between-thumbs="props.minStepsBetweenThumbs"
    :origin="props.origin"
    :orientation="props.orientation"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :name="props.name"
    :form="props.form"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
