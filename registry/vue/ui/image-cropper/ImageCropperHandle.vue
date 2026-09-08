<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ImageCropper as Ark } from "@ark-ui/vue/image-cropper";
import type { ImageCropperHandleProps as ArkHandleProps } from "@ark-ui/vue/image-cropper";
import { cn } from "cn";
import { imageCropper } from "@/registry/shared/lib/image-cropper.styles";

interface ImageCropperHandleProps {
  position: ArkHandleProps["position"];
  class?: HTMLAttributes["class"];
}

const props = defineProps<ImageCropperHandleProps>();

const styles = imageCropper();
</script>

<template>
  <Ark.Handle :position="props.position" :class="cn(styles.handle(), props.class)" />
</template>
