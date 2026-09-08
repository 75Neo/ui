---
title: Image Cropper
description: A viewport that pans, zooms and crops an image to a fixed shape.
category: Forms
registryItem: image-cropper
---

## Usage

```vue
<template>
  <ImageCropper :aspect-ratio="1" crop-shape="circle">
    <ImageCropperViewport>
      <ImageCropperImage :src="src" alt="" />
      <ImageCropperSelection>
        <ImageCropperGrid axis="horizontal" />
        <ImageCropperGrid axis="vertical" />
        <ImageCropperHandle v-for="position in handles" :key="position" :position="position" />
      </ImageCropperSelection>
    </ImageCropperViewport>
  </ImageCropper>
</template>
```

## Shape and ratio

`aspectRatio` locks the selection, and `cropShape="circle"` rounds it for an avatar. The shape is
a mask on the selection, not on the output: the crop is still a rectangle, which is what you want,
because the rounding belongs to wherever the image is displayed.

`fixedCropArea` keeps the selection still and moves the image under it instead, which is the
familiar behaviour from phone photo editors.

## Getting the result

The context exposes the crop rectangle in the image's own pixels and a method that renders it to a
blob. Do the rendering when the person confirms, not on every drag.

## Zoom

`minZoom`, `maxZoom` and `zoomStep` bound the wheel and the pinch. Set the maximum from the source
resolution, so the person cannot zoom past the point where the result would be soft.
