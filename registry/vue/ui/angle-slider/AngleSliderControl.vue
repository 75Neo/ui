<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { AngleSlider as Ark } from "@ark-ui/vue/angle-slider";
import { cn } from "cn";
import { angleSlider } from "@/registry/shared/lib/angle-slider.styles";

interface AngleSliderControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<AngleSliderControlProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = angleSlider();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
