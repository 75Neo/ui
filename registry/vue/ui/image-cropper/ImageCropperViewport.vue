<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ImageCropper as Ark } from "@ark-ui/vue/image-cropper";
import { cn } from "cn";
import { imageCropper } from "@/registry/shared/lib/image-cropper.styles";

interface ImageCropperViewportProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ImageCropperViewportProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = imageCropper();
</script>

<template>
  <Ark.Viewport :class="cn(styles.viewport(), props.class)">
    <slot />
  </Ark.Viewport>
</template>
