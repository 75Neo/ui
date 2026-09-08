<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = colorPicker();
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
