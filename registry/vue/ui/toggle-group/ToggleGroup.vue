<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { ToggleGroup as Ark } from "@ark-ui/vue/toggle-group";
import { cn } from "cn";
import {
  toggleGroup,
  type ToggleGroupSize,
  type Intent,
} from "@/registry/shared/lib/toggle-group.styles";

interface ToggleGroupProps {
  defaultValue?: string[];
  multiple?: boolean;
  deselectable?: boolean;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  loopFocus?: boolean;
  rovingFocus?: boolean;
  size?: ToggleGroupSize;
  color?: Intent;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ToggleGroupProps>(), {
  multiple: undefined,
  deselectable: undefined,
  disabled: undefined,
  loopFocus: undefined,
  rovingFocus: undefined,
  size: "md",
});

const value = defineModel<string[]>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = computed(() => toggleGroup({ color: props.color }));
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :multiple="props.multiple"
    :deselectable="props.deselectable"
    :disabled="props.disabled"
    :orientation="props.orientation"
    :loop-focus="props.loopFocus"
    :roving-focus="props.rovingFocus"
    :data-size="props.size"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
