<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ImageCropper as Ark } from "@ark-ui/vue/image-cropper";
import { cn } from "cn";
import { imageCropperStyles as styles } from "@/registry/shared/lib/image-cropper.styles";

interface ImageCropperSelectionProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ImageCropperSelectionProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Selection :class="cn(styles.selection(), props.class)">
    <slot />
  </Ark.Selection>
</template>
