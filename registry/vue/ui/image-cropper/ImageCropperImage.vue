<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ImageCropper as Ark } from "@ark-ui/vue/image-cropper";
import { cn } from "cn";
import { imageCropper } from "@/registry/shared/lib/image-cropper.styles";

interface ImageCropperImageProps {
  src?: string;
  class?: HTMLAttributes["class"];
}

const props = defineProps<ImageCropperImageProps>();

const styles = imageCropper();
</script>

<template>
  <Ark.Image :src="props.src" :class="cn(styles.image(), props.class)" />
</template>
