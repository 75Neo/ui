<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerValueTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerValueTextProps>();

const styles = colorPicker();
</script>

<template>
  <Ark.ValueText :class="cn(styles.valueText(), props.class)" />
</template>
