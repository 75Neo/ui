<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { AngleSlider as Ark } from "@ark-ui/vue/angle-slider";
import { cn } from "cn";
import { angleSliderStyles as styles } from "@/registry/shared/lib/angle-slider.styles";

interface AngleSliderValueTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<AngleSliderValueTextProps>();
</script>

<template>
  <Ark.ValueText :class="cn(styles.valueText(), props.class)" />
</template>
