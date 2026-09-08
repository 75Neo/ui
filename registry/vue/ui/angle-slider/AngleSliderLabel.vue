<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { AngleSlider as Ark } from "@ark-ui/vue/angle-slider";
import { cn } from "cn";
import { angleSlider } from "@/registry/shared/lib/angle-slider.styles";

interface AngleSliderLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<AngleSliderLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = angleSlider();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
