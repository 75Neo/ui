import { ToggleGroup, ToggleGroupItem } from "@/components/react";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;

export default function ToggleGroupColors() {
  return (
    <div className="flex flex-col gap-3">
      {colors.map((color) => (
        <ToggleGroup key={color} color={color} defaultValue={["on"]}>
          <ToggleGroupItem value="on">{color}</ToggleGroupItem>
          <ToggleGroupItem value="off">off</ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  );
}
