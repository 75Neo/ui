<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerAreaThumbProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerAreaThumbProps>();
</script>

<template>
  <Ark.AreaThumb :class="cn(styles.areaThumb(), props.class)" />
</template>
