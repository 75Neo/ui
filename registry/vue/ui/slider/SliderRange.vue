<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cn } from "cn";
import { slider } from "@/registry/shared/lib/slider.styles";

interface SliderRangeProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SliderRangeProps>();

const styles = slider();
</script>

<template>
  <Ark.Range :class="cn(styles.range(), props.class)" />
</template>
