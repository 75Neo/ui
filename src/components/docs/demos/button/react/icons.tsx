import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/react";

export default function ButtonIcons() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button leading={<Download />} variant="outline">
        Download
      </Button>

      <Button trailing={<ArrowRight />}>Continue</Button>
    </div>
  );
}
