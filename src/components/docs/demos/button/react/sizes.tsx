import { Button } from "@/components/react";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-end gap-2">
      {sizes.map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </div>
  );
}
