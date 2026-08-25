<script setup lang="ts">
import { button, type ButtonVariants } from "@75neo/styles";

const props = defineProps<{
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  color?: ButtonVariants["color"];
  ui?: string;
}>();
</script>

<template>
  <button :class="button({ variant, size, color, class: ui })">
    <slot />
  </button>
</template>
