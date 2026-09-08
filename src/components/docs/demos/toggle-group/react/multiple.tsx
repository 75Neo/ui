import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/react";

const marks = [
  { value: "bold", Icon: Bold, label: "Bold" },
  { value: "italic", Icon: Italic, label: "Italic" },
  { value: "underline", Icon: Underline, label: "Underline" },
];

export default function ToggleGroupMultiple() {
  return (
    <ToggleGroup multiple defaultValue={["bold", "underline"]}>
      {marks.map(({ value, Icon, label }) => (
        <ToggleGroupItem key={value} value={value} aria-label={label}>
          <Icon className="size-4" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
