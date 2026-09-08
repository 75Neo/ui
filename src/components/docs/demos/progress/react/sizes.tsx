import {
  Progress,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
  ProgressValueText,
} from "@/components/react";

const bars = [
  { size: "sm", label: "Downloading grammars", value: 24 },
  { size: "md", label: "Writing components", value: 62 },
  { size: "lg", label: "Building the registry", value: 91 },
] as const;

export default function ProgressSizes() {
  return (
    <div className="flex w-full flex-col gap-8">
      {bars.map((bar) => (
        <Progress key={bar.size} size={bar.size} defaultValue={bar.value}>
          <div className="flex items-baseline justify-between gap-4">
            <ProgressLabel>{bar.label}</ProgressLabel>
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
