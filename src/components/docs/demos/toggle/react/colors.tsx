import { Toggle } from "@/components/react";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;

export default function ToggleColors() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {colors.map((color) => (
        <Toggle key={color} color={color} defaultPressed>
          {color}
        </Toggle>
      ))}
    </div>
  );
}
