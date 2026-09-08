<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import type { ColorFormat } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerViewProps {
  format: ColorFormat;
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerViewProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = colorPicker();
</script>

<template>
  <Ark.View :format="props.format" :class="cn(styles.view(), props.class)">
    <slot />
  </Ark.View>
</template>
