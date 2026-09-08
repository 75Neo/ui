<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import type { Color } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerSwatchProps {
  value: string | Color;
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerSwatchProps>();

const styles = colorPicker();
</script>

<template>
  <Ark.Swatch :value="props.value" :class="cn(styles.swatch(), props.class)" />
</template>
