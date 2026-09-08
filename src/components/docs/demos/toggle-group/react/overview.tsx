import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/react";

const alignments = [
  { value: "left", Icon: AlignLeft, label: "Align left" },
  { value: "center", Icon: AlignCenter, label: "Align centre" },
  { value: "right", Icon: AlignRight, label: "Align right" },
];

export default function ToggleGroupOverview() {
  return (
    <ToggleGroup defaultValue={["center"]}>
      {alignments.map(({ value, Icon, label }) => (
        <ToggleGroupItem key={value} value={value} aria-label={label}>
          <Icon className="size-4" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
