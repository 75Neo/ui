import { Plus } from "lucide-react";
import { Button } from "@/components/react";

export default function ButtonShapes() {
  return (
    <div className="flex flex-col gap-3">
      <Button block>Block</Button>

      <div className="flex flex-wrap items-center gap-2">
        <Button square aria-label="Add" size="sm">
          <Plus />
        </Button>
        <Button square aria-label="Add" variant="outline">
          <Plus />
        </Button>
        <Button square aria-label="Add" variant="soft" size="lg">
          <Plus />
        </Button>
      </div>
    </div>
  );
}
