<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerValueSwatchProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerValueSwatchProps>();

const styles = colorPicker();
</script>

<template>
  <Ark.ValueSwatch :class="cn(styles.valueSwatch(), props.class)" />
</template>
