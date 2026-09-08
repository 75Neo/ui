<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ImageCropper as Ark } from "@ark-ui/vue/image-cropper";
import { cn } from "cn";
import { imageCropperStyles as styles } from "@/registry/shared/lib/image-cropper.styles";

interface ImageCropperViewportProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ImageCropperViewportProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Viewport :class="cn(styles.viewport(), props.class)">
    <slot />
  </Ark.Viewport>
</template>
