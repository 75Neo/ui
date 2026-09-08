<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ImageCropper as Ark } from "@ark-ui/vue/image-cropper";
import { cn } from "cn";
import { imageCropper } from "@/registry/shared/lib/image-cropper.styles";

interface ImageCropperHandleProps {
  position: string;
  class?: HTMLAttributes["class"];
}

const props = defineProps<ImageCropperHandleProps>();

const styles = imageCropper();
</script>

<template>
  <Ark.Handle :position="props.position" :class="cn(styles.handle(), props.class)" />
</template>
