<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerAreaBackgroundProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerAreaBackgroundProps>();

const styles = colorPicker();
</script>

<template>
  <Ark.AreaBackground :class="cn(styles.areaBackground(), props.class)" />
</template>
