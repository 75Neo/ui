<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerAreaThumbProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerAreaThumbProps>();

const styles = colorPicker();
</script>

<template>
  <Ark.AreaThumb :class="cn(styles.areaThumb(), props.class)" />
</template>
