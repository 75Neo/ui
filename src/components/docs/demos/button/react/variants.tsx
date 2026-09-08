import { Button } from "@/components/react";

const variants = ["solid", "outline", "soft", "subtle", "ghost", "link"] as const;

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  );
}
