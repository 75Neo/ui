import { Slider } from "@75neo/react";

const marks = [
  { value: 0, label: "0" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 75, label: "75" },
  { value: 100, label: "100" },
];

export function SliderPreview() {
  return (
    <div className="flex flex-col gap-8">
      <Slider label="Volume" showValue defaultValue={[65]} />
      <Slider label="Budget" color="success" defaultValue={[20, 70]} minStepsBetweenThumbs={5} />
      <Slider label="Quality" marks={marks} step={25} defaultValue={[50]} />
    </div>
  );
}
