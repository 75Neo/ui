<script setup lang="ts">
import ImageCropper from "@/registry/vue/ui/image-cropper/ImageCropper.vue";
import ImageCropperHandle from "@/registry/vue/ui/image-cropper/ImageCropperHandle.vue";
import ImageCropperGrid from "@/registry/vue/ui/image-cropper/ImageCropperGrid.vue";
import ImageCropperImage from "@/registry/vue/ui/image-cropper/ImageCropperImage.vue";
import ImageCropperSelection from "@/registry/vue/ui/image-cropper/ImageCropperSelection.vue";
import ImageCropperViewport from "@/registry/vue/ui/image-cropper/ImageCropperViewport.vue";

const handles = ["nw", "ne", "sw", "se"];
</script>

<template>
  <div class="max-w-md">
    <ImageCropper :aspect-ratio="1" crop-shape="circle">
      <ImageCropperViewport class="h-56">
        <ImageCropperImage src="https://picsum.photos/seed/75neo-cropper/800/600" alt="" />
        <ImageCropperSelection>
          <ImageCropperGrid />
          <ImageCropperHandle v-for="position in handles" :key="position" :position="position" />
        </ImageCropperSelection>
      </ImageCropperViewport>
    </ImageCropper>
  </div>
</template>
