<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import type { ColorPickerViewProps as ArkViewProps } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerViewProps {
  format: ArkViewProps["format"];
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerViewProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.View :format="props.format" :class="cn(styles.view(), props.class)">
    <slot />
  </Ark.View>
</template>
