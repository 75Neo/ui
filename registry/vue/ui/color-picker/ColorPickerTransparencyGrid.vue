<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerTransparencyGridProps {
  size?: string;
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerTransparencyGridProps>();
</script>

<template>
  <Ark.TransparencyGrid :size="props.size" :class="cn(styles.transparencyGrid(), props.class)" />
</template>
