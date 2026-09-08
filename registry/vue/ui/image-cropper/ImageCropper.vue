<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ImageCropper as Ark } from "@ark-ui/vue/image-cropper";
import { cn } from "cn";
import { imageCropperStyles as styles } from "@/registry/shared/lib/image-cropper.styles";

interface ImageCropperProps {
  aspectRatio?: number;
  cropShape?: "rectangle" | "circle";
  defaultZoom?: number;
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
  fixedCropArea?: boolean;
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ImageCropperProps>(), {
  fixedCropArea: undefined,
  disabled: undefined,
});

const zoom = defineModel<number>("zoom");

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model:zoom="zoom"
    :aspect-ratio="props.aspectRatio"
    :crop-shape="props.cropShape"
    :default-zoom="props.defaultZoom"
    :min-zoom="props.minZoom"
    :max-zoom="props.maxZoom"
    :zoom-step="props.zoomStep"
    :fixed-crop-area="props.fixedCropArea"
    :disabled="props.disabled"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
