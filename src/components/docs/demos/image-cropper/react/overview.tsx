import {
  ImageCropper,
  ImageCropperGrid,
  ImageCropperHandle,
  ImageCropperImage,
  ImageCropperSelection,
  ImageCropperViewport,
} from "@/components/react";

const handles = ["nw", "ne", "sw", "se"] as const;

export default function ImageCropperOverview() {
  return (
    <div className="max-w-md">
      <ImageCropper aspectRatio={1} cropShape="circle">
        <ImageCropperViewport className="h-56">
          <ImageCropperImage src="https://picsum.photos/seed/75neo-cropper/800/600" alt="" />
          <ImageCropperSelection>
            <ImageCropperGrid axis="horizontal" />
            <ImageCropperGrid axis="vertical" />
            {handles.map((position) => (
              <ImageCropperHandle key={position} position={position} />
            ))}
          </ImageCropperSelection>
        </ImageCropperViewport>
      </ImageCropper>
    </div>
  );
}
