<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Carousel as Ark } from "@ark-ui/vue/carousel";
import { cn } from "cn";
import { carousel } from "@/registry/shared/lib/carousel.styles";

interface CarouselProgressTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<CarouselProgressTextProps>();

const styles = carousel();
</script>

<template>
  <Ark.ProgressText :class="cn(styles.progressText(), props.class)" />
</template>
