import {
  Progress,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
  ProgressValueText,
} from "@/components/react";

const colors = ["primary", "success", "info", "warning", "error"] as const;

export default function ProgressColors() {
  return (
    <div className="flex w-full flex-col gap-6">
      {colors.map((color, index) => (
        <Progress key={color} color={color} defaultValue={30 + index * 15}>
          <div className="flex items-baseline justify-between gap-4">
            <ProgressLabel>{color}</ProgressLabel>
            <ProgressValueText />
          </div>
          <ProgressTrack>
            <ProgressRange />
          </ProgressTrack>
        </Progress>
      ))}
    </div>
  );
}
