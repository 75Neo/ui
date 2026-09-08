<script setup lang="ts">
import {
  ImageCropper,
  ImageCropperGrid,
  ImageCropperHandle,
  ImageCropperImage,
  ImageCropperSelection,
  ImageCropperViewport,
} from "@/components/vue";

const handles = ["nw", "ne", "sw", "se"] as const;
</script>

<template>
  <div class="max-w-md">
    <ImageCropper :aspect-ratio="1" crop-shape="circle">
      <ImageCropperViewport class="h-56">
        <ImageCropperImage src="https://picsum.photos/seed/75neo-cropper/800/600" alt="" />
        <ImageCropperSelection>
          <ImageCropperGrid axis="horizontal" />
          <ImageCropperGrid axis="vertical" />
          <ImageCropperHandle v-for="position in handles" :key="position" :position="position" />
        </ImageCropperSelection>
      </ImageCropperViewport>
    </ImageCropper>
  </div>
</template>
