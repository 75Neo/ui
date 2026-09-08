<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerAreaProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerAreaProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = colorPicker();
</script>

<template>
  <Ark.Area :class="cn(styles.area(), props.class)">
    <slot />
  </Ark.Area>
</template>
