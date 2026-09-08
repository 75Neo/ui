import { Button } from "@/components/react";

export default function ButtonLoading() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button loading>Saving</Button>
      <Button loading variant="outline">
        Saving
      </Button>
      <Button loading variant="soft" color="error">
        Deleting
      </Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}
