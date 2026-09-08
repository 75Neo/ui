import { Toggle } from "@/components/react";

const sizes = ["sm", "md", "lg"] as const;

export default function ToggleSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Toggle key={size} size={size} defaultPressed>
          {size}
        </Toggle>
      ))}
    </div>
  );
}
