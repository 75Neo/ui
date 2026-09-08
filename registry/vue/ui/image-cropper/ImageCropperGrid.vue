<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ImageCropper as Ark } from "@ark-ui/vue/image-cropper";
import { cn } from "cn";
import { imageCropper } from "@/registry/shared/lib/image-cropper.styles";

interface ImageCropperGridProps {
  axis: "horizontal" | "vertical";
  class?: HTMLAttributes["class"];
}

const props = defineProps<ImageCropperGridProps>();

const styles = imageCropper();
</script>

<template>
  <Ark.Grid :axis="props.axis" :class="cn(styles.grid(), props.class)" />
</template>
