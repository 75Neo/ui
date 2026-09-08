<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerFormatSelectProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerFormatSelectProps>();

const styles = colorPicker();
</script>

<template>
  <Ark.FormatSelect :class="cn(styles.formatSelect(), props.class)" />
</template>
