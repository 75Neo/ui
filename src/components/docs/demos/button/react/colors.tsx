import { Button } from "@/components/react";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;

export default function ButtonColors() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {colors.map((color) => (
          <Button key={color} color={color}>
            {color}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {colors.map((color) => (
          <Button key={color} color={color} variant="soft">
            {color}
          </Button>
        ))}
      </div>
    </div>
  );
}
