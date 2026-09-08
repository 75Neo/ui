<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { AngleSlider as Ark } from "@ark-ui/vue/angle-slider";
import { cn } from "cn";
import { angleSlider } from "@/registry/shared/lib/angle-slider.styles";

interface AngleSliderProps {
  defaultValue?: number;
  step?: number;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  name?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<AngleSliderProps>(), {
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
});

const value = defineModel<number>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = angleSlider();
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :step="props.step"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :name="props.name"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
